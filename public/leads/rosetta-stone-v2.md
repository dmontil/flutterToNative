# Flutter to SwiftUI: The Complete Rosetta Stone 💎

**Your essential translation guide**: Stop guessing, start building. This cheat sheet maps every Flutter concept to its SwiftUI equivalent with real code examples.

---

## 📱 1. Project Structure & Entry Point

### App Entry
| Flutter | SwiftUI | Notes |
|---------|---------|-------|
| `void main() => runApp(MyApp())` | `@main struct MyApp: App` | SwiftUI uses `App` protocol |
| `MaterialApp` | `WindowGroup { ContentView() }` | MaterialApp → WindowGroup wrapper |
| `Theme.of(context)` | `@Environment(\.colorScheme)` | Theme access via Environment |

```dart
// Flutter
void main() {
  runApp(MaterialApp(home: HomeScreen()));
}
```

```swift
// SwiftUI
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup { HomeScreen() }
    }
}
```

---

## 🎨 2. Widgets vs Views (UI Components)

### Basic UI Elements
| Flutter | SwiftUI | Key Difference |
|---------|---------|---------------|
| `Text("Hello")` | `Text("Hello")` | Nearly identical! |
| `Container` | `VStack/HStack + modifiers` | Container is multi-purpose, SwiftUI separates concerns |
| `SizedBox` | `.frame(width:height:)` | Modifier-based sizing |
| `Image.asset("img")` | `Image("img")` | Assets live in Assets.xcassets |
| `Icon(Icons.star)` | `Image(systemName: "star")` | SF Symbols (5000+ built-in icons) |
| `CircleAvatar` | `Circle().overlay(Image())` | Compose shapes + images |
| `Card` | `RoundedRectangle + shadow` | Build custom with modifiers |
| `ListTile` | `HStack` with `Spacer` | Compose manually or use `List` |

**Code Example: Card UI**
```dart
// Flutter Card
Card(
  child: ListTile(
    leading: Icon(Icons.person),
    title: Text("John Doe"),
    subtitle: Text("Developer"),
  ),
)
```

```swift
// SwiftUI equivalent
RoundedRectangle(cornerRadius: 12)
    .fill(Color.white)
    .shadow(radius: 4)
    .overlay(
        HStack {
            Image(systemName: "person")
            VStack(alignment: .leading) {
                Text("John Doe").font(.headline)
                Text("Developer").font(.subheadline)
            }
            Spacer()
        }.padding()
    )
```

---

## 📐 3. Layout & Positioning

### Flex Layouts
| Flutter | SwiftUI | Notes |
|---------|---------|-------|
| `Column(children: [])` | `VStack {}` | Vertical stack |
| `Row(children: [])` | `HStack {}` | Horizontal stack |
| `Stack(children: [])` | `ZStack {}` | Layered/overlapping views |
| `Expanded(child:)` | `Spacer()` or `.frame(maxWidth: .infinity)` | Fill available space |
| `Flexible(child:)` | No direct equivalent | Use GeometryReader |
| `Wrap` | LazyVGrid / LazyHGrid | Grid layouts |
| `Padding` | `.padding()` | Modifier-based |
| `Center` | `.frame(maxWidth: .infinity).center()` | Alignment via frame |
| `Align` | `.frame(alignment: .topLeading)` | Explicit alignment |

**Code Example: Responsive Layout**
```dart
// Flutter
Row(
  children: [
    Expanded(child: Container(color: Colors.red)),
    SizedBox(width: 8),
    Expanded(child: Container(color: Colors.blue)),
  ],
)
```

```swift
// SwiftUI
HStack(spacing: 8) {
    Color.red.frame(maxWidth: .infinity)
    Color.blue.frame(maxWidth: .infinity)
}
```

---

## 🔄 4. State Management

### Local State
| Flutter | SwiftUI | When to Use |
|---------|---------|-------------|
| `StatefulWidget + setState()` | `@State var count = 0` | Simple UI state (toggles, counters) |
| `initState()` | `.onAppear {}` | Lifecycle initialization |
| `dispose()` | `.onDisappear {}` | Cleanup |

**Example: Counter**
```dart
// Flutter
class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Text('$count');
  }
}
```

```swift
// SwiftUI (way simpler!)
struct Counter: View {
    @State private var count = 0

    var body: some View {
        Text("\(count)")
    }
}
```

### Shared State / View Models
| Flutter Pattern | SwiftUI Pattern | Use Case |
|----------------|----------------|----------|
| `BLoC + StreamBuilder` | `@Published + ObservableObject` | Business logic separation |
| `Provider / ChangeNotifier` | `@StateObject / @ObservedObject` | State sharing across views |
| `Riverpod` | `@EnvironmentObject` | Dependency injection |
| `GetX Controller` | `@StateObject ViewModel` | MVVM pattern |
| `Cubit.emit(state)` | `@Published var state` | Reactive updates |

**Example: ViewModel Pattern**
```dart
// Flutter (BLoC)
class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<Increment>((event, emit) => emit(state + 1));
  }
}

// Usage
BlocBuilder<CounterBloc, int>(
  builder: (context, count) => Text('$count'),
)
```

```swift
// SwiftUI (MVVM)
class CounterViewModel: ObservableObject {
    @Published var count = 0

    func increment() {
        count += 1  // UI updates automatically!
    }
}

// Usage
struct ContentView: View {
    @StateObject var vm = CounterViewModel()

    var body: some View {
        Text("\(vm.count)")
    }
}
```

---

## 🚦 5. Navigation

| Flutter | SwiftUI | Notes |
|---------|---------|-------|
| `Navigator.push()` | `NavigationLink` | Declarative navigation |
| `Navigator.pop()` | `@Environment(\.dismiss)` | Pop via environment |
| `Navigator.pushNamed()` | `.sheet()` / `.fullScreenCover()` | Modal presentation |
| `TabBar + TabBarView` | `TabView {}` | Tabbed interface |
| `PageView` | `TabView(style: .page)` | Swipeable pages |
| `Drawer` | `.toolbar { }` + `NavigationStack` | Sidebar navigation |

**Example: Navigation**
```dart
// Flutter
Navigator.push(
  context,
  MaterialPageRoute(builder: (_) => DetailScreen()),
);
```

```swift
// SwiftUI (declarative!)
NavigationStack {
    List {
        NavigationLink("Details") {
            DetailScreen()
        }
    }
}
```

---

## 🎬 6. Animations

| Flutter | SwiftUI | Difference |
|---------|---------|-----------|
| `AnimationController` | `@State + .animation()` | Implicit animations in SwiftUI |
| `Tween` | `Animation.linear / .easeInOut` | Animation curves |
| `AnimatedBuilder` | `.animation(.spring())` | Automatic animation |
| `Hero` | `.matchedGeometryEffect()` | Shared element transitions |
| `Transform.rotate` | `.rotationEffect()` | Transform modifiers |
| `AnimatedOpacity` | `.opacity().animation()` | Opacity transitions |

**Example: Fade Animation**
```dart
// Flutter (explicit)
AnimatedOpacity(
  opacity: isVisible ? 1.0 : 0.0,
  duration: Duration(milliseconds: 300),
  child: Text("Fade me"),
)
```

```swift
// SwiftUI (implicit!)
Text("Fade me")
    .opacity(isVisible ? 1.0 : 0.0)
    .animation(.easeInOut(duration: 0.3), value: isVisible)
```

---

## 📝 7. Forms & Input

| Flutter | SwiftUI | Notes |
|---------|---------|-------|
| `TextField` | `TextField("", text: $value)` | Two-way binding with `$` |
| `TextFormField` | `TextField + validation` | Manual validation |
| `Form` | `Form {}` | Form wrapper |
| `Checkbox` | `Toggle("", isOn: $bool)` | Native iOS toggle |
| `Switch` | `Toggle` | Same as checkbox |
| `Slider` | `Slider(value: $val, in: 0...100)` | Range slider |
| `DropdownButton` | `Picker` | Native picker |
| `DatePicker` | `DatePicker` | Nearly identical |

**Example: Form Binding**
```dart
// Flutter
TextFormField(
  onChanged: (val) => setState(() => name = val),
)
```

```swift
// SwiftUI (two-way binding!)
@State var name = ""

TextField("Name", text: $name)  // $ = binding
```

---

## 🔁 8. Lists & Scroll Views

| Flutter | SwiftUI | Performance Notes |
|---------|---------|------------------|
| `ListView.builder` | `List { ForEach }` | Lazy loading by default |
| `GridView` | `LazyVGrid` / `LazyHGrid` | Lazy grids |
| `SingleChildScrollView` | `ScrollView {}` | Scrollable container |
| `RefreshIndicator` | `.refreshable {}` | Pull-to-refresh |
| `ListView.separated` | `List { } .listRowSeparator()` | Custom separators |

**Example: Dynamic List**
```dart
// Flutter
ListView.builder(
  itemCount: items.length,
  itemBuilder: (ctx, i) => Text(items[i]),
)
```

```swift
// SwiftUI
List(items, id: \.self) { item in
    Text(item)
}
```

---

## ⚙️ 9. Lifecycle & Side Effects

| Flutter | SwiftUI | Purpose |
|---------|---------|---------|
| `initState()` | `.onAppear {}` | Initialize on view appear |
| `dispose()` | `.onDisappear {}` | Cleanup |
| `didUpdateWidget()` | `.onChange(of: value) {}` | React to changes |
| `FutureBuilder` | `.task {}` | Async loading |
| `StreamBuilder` | `.onReceive(publisher)` | Subscribe to streams |

---

## 🧠 10. Memory Management (CRITICAL!)

| Concept | Flutter | iOS/Swift |
|---------|---------|-----------|
| Memory Model | **Garbage Collected** | **ARC (Automatic Reference Counting)** |
| Closure Captures | Auto-managed | **MUST use `[weak self]` to avoid retain cycles** |
| Memory Leaks | Rare (GC handles it) | Common if not careful with closures |
| Performance | Slight overhead (GC pauses) | Deterministic (no GC pauses) |

**⚠️ MOST COMMON MISTAKE FOR FLUTTER DEVS:**

```swift
// ❌ WRONG - Creates retain cycle (memory leak!)
class ViewModel: ObservableObject {
    func fetchData() {
        networkCall { result in
            self.data = result  // 'self' captured strongly!
        }
    }
}

// ✅ CORRECT - Use [weak self]
class ViewModel: ObservableObject {
    func fetchData() {
        networkCall { [weak self] result in
            self?.data = result  // Weak reference, no leak
        }
    }
}
```

**Rule**: If your closure outlives the view (network calls, timers, observers), **ALWAYS use `[weak self]`**.

---

## 🔌 11. Dependency Injection

| Flutter | SwiftUI | Pattern |
|---------|---------|---------|
| `Provider.of<T>(context)` | `@EnvironmentObject` | Access injected dependency |
| `GetIt.instance.get<T>()` | Constructor injection | Pass dependencies explicitly |
| `InheritedWidget` | `@Environment(\.customKey)` | Custom environment values |
| `Riverpod providers` | `@StateObject + DI Container` | Swinject or pure DI |

---

## 🎯 12. Architecture Patterns

| Flutter Architecture | iOS/SwiftUI Equivalent | When to Use |
|---------------------|----------------------|-------------|
| **BLoC** | **MVVM** | ✅ Standard for most apps |
| **Provider + ChangeNotifier** | **ObservableObject** | ✅ Simple state management |
| **Riverpod** | **Combine + DI** | ⚠️ Complex apps with many dependencies |
| **GetX** | **Coordinator + MVVM** | ⚠️ Need to separate navigation logic |
| **Clean Architecture** | **Clean Architecture** | ✅ Same concepts! (Domain, Data, Presentation layers) |
| **MVVM + Repository** | **MVVM + Repository** | ✅ Direct translation |

---

## 🛠️ 13. Common Tasks Comparison

### Network Requests
```dart
// Flutter (http package)
final response = await http.get(Uri.parse(url));
final data = jsonDecode(response.body);
```

```swift
// SwiftUI (URLSession + async/await)
let (data, _) = try await URLSession.shared.data(from: url)
let decoded = try JSONDecoder().decode(Model.self, from: data)
```

### JSON Parsing
```dart
// Flutter (json_serializable)
@JsonSerializable()
class User {
  final String name;
  User({required this.name});

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
}
```

```swift
// SwiftUI (Codable)
struct User: Codable {
    let name: String
    // Parsing is automatic!
}

let user = try JSONDecoder().decode(User.self, from: data)
```

### Local Storage
```dart
// Flutter (SharedPreferences)
final prefs = await SharedPreferences.getInstance();
await prefs.setString('key', 'value');
```

```swift
// SwiftUI (UserDefaults or @AppStorage)
@AppStorage("key") var value = ""

// Or directly:
UserDefaults.standard.set("value", forKey: "key")
```

---

## 🚨 14. Top 5 Gotchas for Flutter Developers

### 1. **Value Types vs Reference Types**
- **Flutter**: Everything is a reference (objects on heap)
- **Swift**: Structs are value types (copied), Classes are references
- **Impact**: SwiftUI Views are structs → they get copied, not referenced

### 2. **Mutability**
- **Flutter**: `final` vs `var`
- **Swift**: `let` (immutable) vs `var` (mutable)
- **Gotcha**: Swift is strict about immutability. Use `let` by default.

### 3. **Null Safety**
- **Flutter**: Null-safety with `?` and `!`
- **Swift**: Optionals with `?` and `!` (same syntax, slightly different behavior)
- **Tip**: Use `if let` or `guard let` for safe unwrapping

### 4. **Async/Await**
- **Flutter**: `async/await` with `Future<T>`
- **Swift**: `async/await` with `Task {}`
- **Difference**: Swift requires `Task {}` wrapper in non-async contexts

### 5. **Hot Reload**
- **Flutter**: ⚡ Instant hot reload
- **SwiftUI**: ❌ No hot reload (but Xcode Previews help)
- **Workaround**: Use SwiftUI Previews for rapid iteration

---

## 📊 15. Performance Comparison

| Aspect | Flutter | SwiftUI | Winner |
|--------|---------|---------|--------|
| **Startup Time** | Slower (Dart VM) | Faster (native) | 🏆 SwiftUI |
| **Frame Rate** | 60fps (can drop on complex UI) | 60fps (GPU-accelerated) | 🏆 SwiftUI |
| **Bundle Size** | Larger (~20MB base) | Smaller (~5MB base) | 🏆 SwiftUI |
| **Hot Reload** | ⚡ Yes | ❌ No | 🏆 Flutter |
| **Memory Usage** | Higher (GC overhead) | Lower (ARC) | 🏆 SwiftUI |
| **Build Time** | Fast incremental | Slower (Xcode) | 🏆 Flutter |

---

## 🎓 16. Learning Path

### Week 1: Basics
- [ ] Set up Xcode and create first SwiftUI project
- [ ] Learn `@State`, `@Binding`, `@ObservedObject`
- [ ] Build a simple counter app
- [ ] Understand SwiftUI layout system (VStack, HStack, ZStack)

### Week 2: Navigation & State
- [ ] Implement NavigationStack
- [ ] Create a multi-screen app
- [ ] Build your first ViewModel with `@Published`
- [ ] Learn memory management basics (`[weak self]`)

### Week 3: Architecture
- [ ] Implement MVVM pattern
- [ ] Add Clean Architecture layers
- [ ] Learn Coordinator pattern for navigation
- [ ] Set up dependency injection

### Week 4: Production Ready
- [ ] Add unit tests for ViewModels
- [ ] Implement error handling
- [ ] Network layer with URLSession
- [ ] App Store deployment prep

---

## 🔗 17. Essential Resources

- **Apple Documentation**: [developer.apple.com/documentation/swiftui](https://developer.apple.com/documentation/swiftui)
- **WWDC Videos**: Search "SwiftUI" on Apple Developer
- **Hacking with Swift**: Free SwiftUI tutorials
- **100 Days of SwiftUI**: Complete beginner course

---

## 🚀 Ready to Go Deeper?

This cheat sheet covers the essentials, but there's so much more:
- Advanced MVVM patterns
- Coordinator for complex navigation
- Swift Package Manager for modularization
- Dependency Injection strategies
- Testing architecture
- Performance optimization

**Unlock the complete iOS Playbook** with in-depth guides, real-world examples, and 50+ interview questions.

👉 [Get the Full Playbook](https://fluttertonative.pro/pricing)

---

**© 2026 FlutterToNative.pro** | Made with ❤️ for Flutter developers transitioning to iOS
