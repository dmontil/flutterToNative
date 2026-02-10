"use client";

import { DocLayout } from "@/components/layout/doc-layout";
import { CodeComparison } from "@/components/ui/code-comparison";
import { PremiumLock } from "@/components/ui/premium-lock";
import { useUser } from "@/components/auth/user-provider";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const COMPONENT_TOPICS = [
    // Layouts
    { title: "Layout: Column & Row", id: "layout-flex" },
    { title: "Layout: Stack (ZStack)", id: "layout-stack" },
    { title: "Layout: Container & Padding", id: "layout-container" },
    { title: "Layout: ListView & Grid", id: "layout-scroll" },
    { title: "Layout: Safe Area", id: "layout-safe-area" },

    // Basics
    { title: "Basic: Text & Label", id: "basic-text" },
    { title: "Basic: Image & Icon", id: "basic-image" },
    { title: "Basic: Buttons", id: "basic-buttons" },
    { title: "Basic: Card & Divider", id: "basic-card" },

    // Controls
    { title: "Control: TextField", id: "control-input" },
    { title: "Control: Switch & Toggle", id: "control-switch" },
    { title: "Control: Slider", id: "control-slider" },
    { title: "Control: DatePicker", id: "control-picker" },

    // Navigation & Modals
    { title: "Nav: Navigation (Push)", id: "nav-push" },
    { title: "Nav: Tabs (BottomBar)", id: "nav-tabs" },
    { title: "Nav: Modals & Sheets", id: "nav-modals" },
    { title: "Nav: Alerts & Dialogs", id: "nav-alert" },

    // Feedback
    { title: "Feedback: Progress / Loading", id: "feedback-progress" },

    // Advanced UI
    { title: "Advanced: Animations", id: "advanced-anim" },
    { title: "Advanced: Gestures", id: "advanced-gestures" },
    { title: "Advanced: Custom Painting", id: "advanced-paint" },
    { title: "Advanced: Platform (Camera/Loc)", id: "advanced-platform" },
];

export default function ComponentsPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading Components...</div>}>
            <ComponentsContent />
        </Suspense>
    );
}

function ComponentsContent() {
    const searchParams = useSearchParams();
    const currentTopic = searchParams.get("topic") || "layout-flex";
    const { hasAccess, isLoading } = useUser();
    const isPro = hasAccess('ios_premium');

    const topic = COMPONENT_TOPICS.find(t => t.id === currentTopic) || COMPONENT_TOPICS[0];

    return (
        <DocLayout
            title="UI Components"
            items={COMPONENT_TOPICS}
            productId="ios_playbook"
            premiumTopics={[
                "control-input", "control-switch", "control-slider", "control-picker",
                "nav-push", "nav-tabs", "nav-modals", "nav-alert",
                "feedback-progress", "advanced-anim", "advanced-gestures",
                "advanced-paint", "advanced-platform"
            ]}
        >
            <div className="mb-8 border-b border-border pb-6">
                <h1 className="text-3xl font-bold mb-2 capitalize">{topic.title}</h1>
                <p className="text-muted-foreground">Flutter ↔ SwiftUI Implementation Guide</p>
            </div>

            {/* --- LAYOUTS --- */}

            {currentTopic === "layout-flex" && (
                <div className="space-y-12">
                    <CodeComparison
                        title="Column (Vertical Layout)"
                        snippets={[
                            {
                                label: "Flutter", language: "dart", code: `Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text("A"),
    Text("B"),
  ],
)` },
                            {
                                label: "SwiftUI", language: "swift", code: `VStack(alignment: .leading, spacing: 10) {
    Text("A")
    Text("B")
}
.frame(maxWidth: .infinity, alignment: .center)` }
                        ]}
                    />
                    <CodeComparison
                        title="Row (Horizontal Layout)"
                        snippets={[
                            {
                                label: "Flutter", language: "dart", code: `Row(
  children: [
    Text("Left"),
    Spacer(),
    Text("Right"),
  ],
)` },
                            {
                                label: "SwiftUI", language: "swift", code: `HStack {
    Text("Left")
    Spacer()
    Text("Right")
}` }
                        ]}
                    />
                </div>
            )}

            {currentTopic === "layout-stack" && (
                <CodeComparison
                    title="Stack (Overlapping Children)"
                    snippets={[
                        {
                            label: "Flutter", language: "dart", code: `Stack(
  alignment: Alignment.center,
  children: [
    Image.asset("bg.png"),
    Text("Overlay"),
  ],
)` },
                        {
                            label: "SwiftUI", language: "swift", code: `ZStack(alignment: .center) {
    Image("bg")
    Text("Overlay")
}` }
                    ]}
                />
            )}

            {currentTopic === "layout-container" && (
                <div className="space-y-12">
                    <CodeComparison
                        title="Container (Styling & Dimensions)"
                        snippets={[
                            {
                                label: "Flutter", language: "dart", code: `Container(
  width: 200,
  height: 100,
  padding: EdgeInsets.all(16),
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(8),
  ),
  child: Text("Box"),
)` },
                            {
                                label: "SwiftUI", language: "swift", code: `Text("Box")
    .padding(16)
    .frame(width: 200, height: 100)
    .background(Color.blue)
    .cornerRadius(8)` }
                        ]}
                    />
                    <div className="bg-muted/30 p-4 rounded-lg text-sm">
                        <strong>Note:</strong> SwiftUI doesn't have a "Container". You chain modifiers (.padding, .background, .frame) directly on the View. Order matters!
                    </div>
                </div>
            )}

            {currentTopic === "layout-scroll" && (
                <CodeComparison
                    title="ListView & Grid"
                    snippets={[
                        {
                            label: "Flutter", language: "dart", code: `ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) => Text(items[index]),
)` },
                        {
                            label: "SwiftUI", language: "swift", code: `List(items) { item in
    Text(item.name)
}
// OR Custom Layout:
ScrollView {
    LazyVStack {
        ForEach(items) { item in
            Text(item.name)
        }
    }
}` }
                    ]}
                />
            )}

            {currentTopic === "layout-safe-area" && (
                <CodeComparison
                    title="SafeArea"
                    snippets={[
                        {
                            label: "Flutter", language: "dart", code: `SafeArea(
  child: Text("Content"),
)` },
                        {
                            label: "SwiftUI", language: "swift", code: `// By default, SwiftUI views respect safe area.
Text("Content")

// To ignore it (backgrounds often do this):
Color.blue.ignoresSafeArea()` }
                    ]}
                />
            )}

            {/* --- BASICS --- */}

            {currentTopic === "basic-text" && (
                <CodeComparison
                    title="Text Styling"
                    snippets={[
                        {
                            label: "Flutter", language: "dart", code: `Text(
  "Hello",
  style: TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.bold,
    color: Colors.red,
  ),
)` },
                        {
                            label: "SwiftUI", language: "swift", code: `Text("Hello")
    .font(.system(size: 20, weight: .bold))
    .foregroundColor(.red)` }
                    ]}
                />
            )}

            {currentTopic === "basic-image" && (
                <CodeComparison
                    title="Images & Icons"
                    snippets={[
                        {
                            label: "Flutter", language: "dart", code: `Image.asset("logo.png")
Icon(Icons.star, color: Colors.yellow)` },
                        {
                            label: "SwiftUI", language: "swift", code: `Image("logo") // from Asset Catalog
Image(systemName: "star.fill") // SF Symbols
    .foregroundColor(.yellow)` }
                    ]}
                />
            )}

            {currentTopic === "basic-buttons" && (
                <CodeComparison
                    title="Buttons"
                    snippets={[
                        {
                            label: "Flutter", language: "dart", code: `ElevatedButton(onPressed: () {}, child: Text("Core"))
TextButton(onPressed: () {}, child: Text("Flat"))
IconButton(onPressed: () {}, icon: Icon(Icons.add))` },
                        {
                            label: "SwiftUI", language: "swift", code: `Button("Core") { } 
    .buttonStyle(.borderedProminent)

Button("Flat") { }
    .buttonStyle(.plain)

Button { } label: { 
    Image(systemName: "plus") 
}` }
                    ]}
                />
            )}

            {currentTopic === "basic-card" && (
                <CodeComparison
                    title="Card / Box Decoration"
                    snippets={[
                        {
                            label: "Flutter", language: "dart", code: `Card(
  elevation: 4,
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
  child: Padding(padding: EdgeInsets.all(16), child: Text("Info")),
)` },
                        {
                            label: "SwiftUI", language: "swift", code: `Text("Info")
    .padding(16)
    .background(Color.white)
    .cornerRadius(12)
    .shadow(radius: 4)` }
                    ]}
                />
            )}

            {/* --- CONTROLS --- */}

            {currentTopic === "control-input" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <CodeComparison
                        title="TextField"
                        snippets={[
                            {
                                label: "Flutter", language: "dart", code: `TextField(
  controller: _ctrl,
  decoration: InputDecoration(
    hintText: "Email",
    border: OutlineInputBorder(),
  ),
)` },
                            {
                                label: "SwiftUI", language: "swift", code: `TextField("Email", text: $email)
    .textFieldStyle(.roundedBorder)` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "control-switch" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <CodeComparison
                        title="Switch / Checkbox"
                        snippets={[
                            {
                                label: "Flutter", language: "dart", code: `Switch(
  value: _isOn,
  onChanged: (v) => setState(() => _isOn = v),
)` },
                            {
                                label: "SwiftUI", language: "swift", code: `Toggle("Label", isOn: $isOn)
    .toggleStyle(.switch) // or .button` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "control-slider" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <CodeComparison
                        title="Slider"
                        snippets={[
                            {
                                label: "Flutter", language: "dart", code: `Slider(
  value: _val,
  min: 0, max: 100,
  onChanged: (v) => setState(() => _val = v),
)` },
                            { label: "SwiftUI", language: "swift", code: `Slider(value: $val, in: 0...100)` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "control-picker" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <CodeComparison
                        title="Pickers / Dropdowns"
                        snippets={[
                            {
                                label: "Flutter", language: "dart", code: `DropdownButton<String>(
  value: _selected,
  items: ["A", "B"].map((s) => DropdownMenuItem(value: s, child: Text(s))).toList(),
  onChanged: (v) => ...,
)` },
                            {
                                label: "SwiftUI", language: "swift", code: `Picker("Select", selection: $selected) {
    Text("A").tag("A")
    Text("B").tag("B")
}
.pickerStyle(.menu) // .wheel, .segmented` }
                        ]}
                    />
                </PremiumLock>
            )}

            {/* --- NAVIGATION --- */}

            {currentTopic === "nav-push" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <CodeComparison
                        title="Navigation (Stack)"
                        snippets={[
                            { label: "Flutter", language: "dart", code: `Navigator.push(context, MaterialPageRoute(builder: (_) => Detail()))` },
                            {
                                label: "SwiftUI", language: "swift", code: `NavigationLink("Go", destination: DetailView()) 
// iOS 16+ preferred:
NavigationStack {
   NavigationLink("Go", value: "detail")
}
.navigationDestination(for: String.self) { val in DetailView() }` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "nav-tabs" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <CodeComparison
                        title="Bottom Tab Bar"
                        snippets={[
                            {
                                label: "Flutter", language: "dart", code: `BottomNavigationBar(
  items: [
    BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
    BottomNavigationBarItem(icon: Icon(Icons.settings), label: "Settings"),
  ],
)` },
                            {
                                label: "SwiftUI", language: "swift", code: `TabView {
    HomeView()
        .tabItem { Label("Home", systemImage: "house") }
    SettingsView()
        .tabItem { Label("Settings", systemImage: "gear") }
}` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "nav-modals" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <CodeComparison
                        title="Modal Sheets"
                        snippets={[
                            {
                                label: "Flutter", language: "dart", code: `showModalBottomSheet(
  context: context,
  builder: (_) => MySheet(),
)` },
                            {
                                label: "SwiftUI", language: "swift", code: `.sheet(isPresented: $showSheet) {
    MySheetView()
}` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "nav-alert" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <CodeComparison
                        title="Alert Logic"
                        snippets={[
                            {
                                label: "Flutter", language: "dart", code: `showDialog(
  context: context,
  builder: (_) => AlertDialog(title: Text("Hi"), actions: [TextButton(...)]),
)` },
                            {
                                label: "SwiftUI", language: "swift", code: `.alert("Hi", isPresented: $showAlert) {
    Button("OK", role: .cancel) { }
}` }
                        ]}
                    />
                </PremiumLock>
            )}

            {/* --- FEEDBACK --- */}

            {currentTopic === "feedback-progress" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <CodeComparison
                        title="Loading Indicators"
                        snippets={[
                            { label: "Flutter", language: "dart", code: `CircularProgressIndicator()` },
                            { label: "SwiftUI", language: "swift", code: `ProgressView()` }
                        ]}
                    />
                </PremiumLock>
            )}

            {/* --- ADVANCED UI --- */}

            {currentTopic === "advanced-anim" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <div className="space-y-12">
                        <CodeComparison
                            title="Implicit Animations"
                            snippets={[
                                {
                                    label: "Flutter", language: "dart", code: `AnimatedContainer(
  duration: Duration(seconds: 1),
  color: _selected ? Colors.red : Colors.blue,
)` },
                                {
                                    label: "SwiftUI", language: "swift", code: `Rectangle()
    .fill(selected ? .red : .blue)
    .animation(.default, value: selected)` }
                            ]}
                        />
                        <CodeComparison
                            title="Explicit Animations (Transitions)"
                            snippets={[
                                {
                                    label: "Flutter", language: "dart", code: `if (_show) 
  FadeTransition(
    opacity: _controller,
    child: Text("Hi"),
  )` },
                                {
                                    label: "SwiftUI", language: "swift", code: `if show {
    Text("Hi")
        .transition(.opacity.combined(with: .scale))
}` }
                            ]}
                        />
                    </div>
                </PremiumLock>
            )}

            {currentTopic === "advanced-gestures" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <CodeComparison
                        title="Gestures"
                        snippets={[
                            {
                                label: "Flutter", language: "dart", code: `GestureDetector(
  onTap: () => print("Tap"),
  onLongPress: () => print("Long"),
  child: Container(...),
)` },
                            {
                                label: "SwiftUI", language: "swift", code: `Container()
    .onTapGesture { print("Tap") }
    .onLongPressGesture { print("Long") }
    .gesture(
        DragGesture()
            .onChanged { value in ... }
    )` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "advanced-paint" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <CodeComparison
                        title="Custom Painting"
                        snippets={[
                            {
                                label: "Flutter", language: "dart", code: `CustomPaint(
  painter: MyPainter(),
)` },
                            {
                                label: "SwiftUI", language: "swift", code: `Canvas { context, size in
    context.fill(
        Path(ellipseIn: CGRect(x: 0, y: 0, width: 20, height: 20)),
        with: .color(.red)
    )
}
// OR use Shapes:
Circle().fill(.red).frame(width: 20)` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "advanced-platform" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <CodeComparison
                        title="Platform Integration (Permissions)"
                        snippets={[
                            {
                                label: "Flutter", language: "dart", code: `// pubspec.yaml: permission_handler
if (await Permission.camera.request().isGranted) {
  // Open camera
}` },
                            {
                                label: "SwiftUI", language: "swift", code: `// Info.plist: NSCameraUsageDescription

import AVFoundation

switch AVCaptureDevice.authorizationStatus(for: .video) {
    case .authorized: // Open
    case .notDetermined:
        AVCaptureDevice.requestAccess(for: .video) { granted in ... }
    default: // Alert user
}` }
                        ]}
                    />
                </PremiumLock>
            )}

        </DocLayout>
    );
}
