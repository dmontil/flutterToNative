"use client";

import { DocLayout } from "@/components/layout/doc-layout";
import { CodeComparison } from "@/components/ui/code-comparison";
import { PremiumLock } from "@/components/ui/premium-lock";
import { useUser } from "@/components/auth/user-provider";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const COMPONENT_TOPICS = [
    { title: "Layout: Column & Row", id: "layout-flex" },
    { title: "Layout: Stack (Box)", id: "layout-stack" },
    { title: "Layout: Container & Padding", id: "layout-container" },
    { title: "Layout: ListView & Grid", id: "layout-scroll" },
    { title: "Layout: Safe Area", id: "layout-safe-area" },

    { title: "Basic: Text & Label", id: "basic-text" },
    { title: "Basic: Image & Icon", id: "basic-image" },
    { title: "Basic: Buttons", id: "basic-buttons" },
    { title: "Basic: Card & Divider", id: "basic-card" },

    { title: "Control: TextField", id: "control-input" },
    { title: "Control: Switch & Toggle", id: "control-switch" },
    { title: "Control: Slider", id: "control-slider" },
    { title: "Control: DatePicker", id: "control-picker" },

    { title: "Nav: Navigation (Push)", id: "nav-push" },
    { title: "Nav: Tabs (BottomBar)", id: "nav-tabs" },
    { title: "Nav: Modals & Sheets", id: "nav-modals" },
    { title: "Nav: Alerts & Dialogs", id: "nav-alert" },

    { title: "Feedback: Progress / Loading", id: "feedback-progress" },

    { title: "Advanced: Animations", id: "advanced-anim" },
    { title: "Advanced: Gestures", id: "advanced-gestures" },
    { title: "Advanced: Custom Painting", id: "advanced-paint" },
    { title: "Advanced: Platform (Camera/Loc)", id: "advanced-platform" },
];

export default function AndroidComponentsPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading Components...</div>}>
            <AndroidComponentsContent />
        </Suspense>
    );
}

function AndroidComponentsContent() {
    const searchParams = useSearchParams();
    const currentTopic = searchParams.get("topic") || "layout-flex";
    const { hasAccess, user, entitlements, isLoading } = useUser();
    const isPro = hasAccess('android_premium');

    console.log('[AndroidComponentsPage] 🔍 Current state:', {
        hasUser: !!user,
        userEmail: user?.email,
        entitlements,
        isLoading,
        isPro,
        hasAccessResult: hasAccess('android_premium'),
        currentTopic
    });

    const topic = COMPONENT_TOPICS.find(t => t.id === currentTopic) || COMPONENT_TOPICS[0];

    return (
        <DocLayout
            title="UI Components"
            items={COMPONENT_TOPICS}
            productId="android_playbook"
            premiumTopics={[
                "control-input", "control-switch", "control-slider", "control-picker",
                "nav-push", "nav-tabs", "nav-modals", "nav-alert",
                "feedback-progress", "advanced-anim", "advanced-gestures",
                "advanced-paint", "advanced-platform"
            ]}
        >
            <div className="mb-8 border-b border-border pb-6">
                <h1 className="text-3xl font-bold mb-2 capitalize">{topic.title}</h1>
                <p className="text-muted-foreground">Flutter ↔ Jetpack Compose Implementation Guide</p>
            </div>

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
                                label: "Compose", language: "kotlin", code: `Column(
  verticalArrangement = Arrangement.Center,
  horizontalAlignment = Alignment.Start
) {
  Text("A")
  Text("B")
}` }
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
                                label: "Compose", language: "kotlin", code: `Row {
  Text("Left")
  Spacer(Modifier.weight(1f))
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
                            label: "Compose", language: "kotlin", code: `Box(contentAlignment = Alignment.Center) {
  Image(painterResource(R.drawable.bg), contentDescription = null)
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
                                label: "Compose", language: "kotlin", code: `Box(
  modifier = Modifier
    .size(width = 200.dp, height = 100.dp)
    .clip(RoundedCornerShape(8.dp))
    .background(Color.Blue)
    .padding(16.dp)
) {
  Text("Box")
}` }
                        ]}
                    />
                    <div className="bg-muted/30 p-4 rounded-lg text-sm">
                        <strong>Note:</strong> Compose uses Modifiers to compose layout + styling. Order matters.
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
                            label: "Compose", language: "kotlin", code: `LazyColumn {
  items(items) { item ->
    Text(item)
  }
}

// Grid
LazyVerticalGrid(columns = GridCells.Fixed(2)) {
  items(items) { item -> Text(item) }
}` }
                    ]}
                />
            )}

            {currentTopic === "layout-safe-area" && (
                <CodeComparison
                    title="Safe Area"
                    snippets={[
                        { label: "Flutter", language: "dart", code: `SafeArea(
  child: Scaffold(...),
)` },
                        { label: "Compose", language: "kotlin", code: `Scaffold(
  contentWindowInsets = WindowInsets.safeDrawing
) { padding ->
  Box(Modifier.padding(padding)) { ... }
}` }
                    ]}
                />
            )}

            {currentTopic === "basic-text" && (
                <CodeComparison
                    title="Text & Label"
                    snippets={[
                        { label: "Flutter", language: "dart", code: `Text(
  "Hello",
  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
)` },
                        { label: "Compose", language: "kotlin", code: `Text(
  "Hello",
  style = MaterialTheme.typography.titleLarge
)` }
                    ]}
                />
            )}

            {currentTopic === "basic-image" && (
                <CodeComparison
                    title="Image & Icon"
                    snippets={[
                        { label: "Flutter", language: "dart", code: `Image.asset("logo.png")` },
                        { label: "Compose", language: "kotlin", code: `Image(
  painter = painterResource(R.drawable.logo),
  contentDescription = null
)` }
                    ]}
                />
            )}

            {currentTopic === "basic-buttons" && (
                <CodeComparison
                    title="Buttons"
                    snippets={[
                        { label: "Flutter", language: "dart", code: `ElevatedButton(
  onPressed: () {},
  child: Text("Save"),
)` },
                        { label: "Compose", language: "kotlin", code: `Button(onClick = { }) {
  Text("Save")
}` }
                    ]}
                />
            )}

            {currentTopic === "basic-card" && (
                <CodeComparison
                    title="Card & Divider"
                    snippets={[
                        { label: "Flutter", language: "dart", code: `Card(
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Text("Card"),
  ),
)` },
                        { label: "Compose", language: "kotlin", code: `Card {
  Text("Card", modifier = Modifier.padding(16.dp))
}` }
                    ]}
                />
            )}

            {currentTopic === "control-input" && (
                <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                    <CodeComparison
                        title="TextField"
                        snippets={[
                            { label: "Flutter", language: "dart", code: `TextField(
  controller: controller,
  decoration: InputDecoration(labelText: "Email"),
)` },
                            { label: "Compose", language: "kotlin", code: `OutlinedTextField(
  value = email,
  onValueChange = { email = it },
  label = { Text("Email") }
)` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "control-switch" && (
                <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                    <CodeComparison
                        title="Switch"
                        snippets={[
                            { label: "Flutter", language: "dart", code: `Switch(
  value: enabled,
  onChanged: (v) => setState(() => enabled = v),
)` },
                            { label: "Compose", language: "kotlin", code: `Switch(
  checked = enabled,
  onCheckedChange = { enabled = it }
)` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "control-slider" && (
                <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                    <CodeComparison
                        title="Slider"
                        snippets={[
                            { label: "Flutter", language: "dart", code: `Slider(
  value: value,
  onChanged: (v) => setState(() => value = v),
)` },
                            { label: "Compose", language: "kotlin", code: `Slider(
  value = value,
  onValueChange = { value = it }
)` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "control-picker" && (
                <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                    <CodeComparison
                        title="DatePicker"
                        snippets={[
                            { label: "Flutter", language: "dart", code: `showDatePicker(
  context: context,
  initialDate: DateTime.now(),
  firstDate: DateTime(2020),
  lastDate: DateTime(2030),
)` },
                            { label: "Compose", language: "kotlin", code: `DatePickerDialog(
  onDismissRequest = { },
  confirmButton = { TextButton(onClick = { }) { Text("OK") } }
) { DatePicker(state = rememberDatePickerState()) }` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "nav-push" && (
                <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                    <CodeComparison
                        title="Navigation (Push)"
                        snippets={[
                            { label: "Flutter", language: "dart", code: `Navigator.push(
  context,
  MaterialPageRoute(builder: (_) => DetailsPage()),
)` },
                            { label: "Compose", language: "kotlin", code: `navController.navigate("details")` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "nav-tabs" && (
                <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                    <CodeComparison
                        title="Tabs"
                        snippets={[
                            { label: "Flutter", language: "dart", code: `BottomNavigationBar(
  currentIndex: index,
  onTap: (i) => setState(() => index = i),
)` },
                            { label: "Compose", language: "kotlin", code: `NavigationBar {
  NavigationBarItem(
    selected = index == 0,
    onClick = { index = 0 },
    icon = { Icon(Icons.Default.Home, null) },
    label = { Text("Home") }
  )
}` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "nav-modals" && (
                <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                    <CodeComparison
                        title="Modals & Sheets"
                        snippets={[
                            { label: "Flutter", language: "dart", code: `showModalBottomSheet(
  context: context,
  builder: (_) => SheetContent(),
)` },
                            { label: "Compose", language: "kotlin", code: `ModalBottomSheet(
  onDismissRequest = { },
  sheetState = sheetState
) { SheetContent() }` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "nav-alert" && (
                <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                    <CodeComparison
                        title="Alerts & Dialogs"
                        snippets={[
                            { label: "Flutter", language: "dart", code: `showDialog(
  context: context,
  builder: (_) => AlertDialog(
    title: Text("Confirm"),
    content: Text("Are you sure?"),
  ),
)` },
                            { label: "Compose", language: "kotlin", code: `AlertDialog(
  onDismissRequest = { },
  title = { Text("Confirm") },
  text = { Text("Are you sure?") },
  confirmButton = { TextButton(onClick = { }) { Text("OK") } }
)` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "feedback-progress" && (
                <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                    <CodeComparison
                        title="Progress / Loading"
                        snippets={[
                            { label: "Flutter", language: "dart", code: `CircularProgressIndicator()` },
                            { label: "Compose", language: "kotlin", code: `CircularProgressIndicator()` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "advanced-anim" && (
                <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                    <CodeComparison
                        title="Animations"
                        snippets={[
                            { label: "Flutter", language: "dart", code: `AnimatedContainer(
  duration: Duration(milliseconds: 300),
  width: expanded ? 200 : 100,
)` },
                            { label: "Compose", language: "kotlin", code: `val width by animateDpAsState(if (expanded) 200.dp else 100.dp)
Box(Modifier.width(width))` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "advanced-gestures" && (
                <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                    <CodeComparison
                        title="Gestures"
                        snippets={[
                            { label: "Flutter", language: "dart", code: `GestureDetector(
  onTap: () {},
  child: Container(),
)` },
                            { label: "Compose", language: "kotlin", code: `Box(
  Modifier.pointerInput(Unit) {
    detectTapGestures(onTap = { })
  }
)` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "advanced-paint" && (
                <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                    <CodeComparison
                        title="Custom Painting"
                        snippets={[
                            { label: "Flutter", language: "dart", code: `CustomPaint(
  painter: MyPainter(),
)` },
                            { label: "Compose", language: "kotlin", code: `Canvas(modifier = Modifier.size(120.dp)) {
  drawCircle(Color.Red, radius = 40f)
}` }
                        ]}
                    />
                </PremiumLock>
            )}

            {currentTopic === "advanced-platform" && (
                <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                    <CodeComparison
                        title="Platform APIs"
                        snippets={[
                            { label: "Flutter", language: "dart", code: `const channel = MethodChannel("camera");
final result = await channel.invokeMethod("open");` },
                            { label: "Compose", language: "kotlin", code: `val launcher = rememberLauncherForActivityResult(...)
launcher.launch(request)` }
                        ]}
                    />
                </PremiumLock>
            )}
        </DocLayout>
    );
}
