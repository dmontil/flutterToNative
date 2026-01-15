# Flutter to SwiftUI: The Rosetta Stone Cheat Sheet 💎

Master the mapping between Flutter and SwiftUI. Stop guessing and start bridging.

## 1. Widget vs. View
In Flutter, everything is a **Widget**. In iOS, everything is a **View**.

| Feature | Flutter | SwiftUI |
|---------|---------|---------|
| Entry Point | `MaterialApp` | `@main struct App` |
| Container | `Container` / `SizedBox` | `VStack` / `HStack` / `Color` |
| Text | `Text("Hello")` | `Text("Hello")` |
| Images | `Image.asset()` | `Image("name")` |
| Spacer | `Spacer()` | `Spacer()` |

## 2. Layout & Positioning
| Flutter | SwiftUI |
|---------|---------|
| `Column` | `VStack` |
| `Row` | `HStack` |
| `Stack` | `ZStack` |
| `Padding` | `.padding()` |
| `Expanded` | `Spacer()` or `.frame(maxWidth: .infinity)` |

## 3. State Management
| Concept | Flutter (BLoC/Cubit) | SwiftUI |
|---------|---------|---------|
| Local State | `StatefulWidget` / `setState` | `@State` |
| View Model | `Cubit` / `Provider` | `@ObservableObject` / `@StateObject` |
| Dependency Injection | `GetIt` / `InheritedWidget` | `@EnvironmentObject` / `Environment` |
| Data Update | `stream.emit()` | `@Published` property update |

## 4. Advanced: Memory & Performance
*   **Flutter**: Garbage Generated (Heap). Managed by GC.
*   **SwiftUI**: Reference Counting (ARC). You MUST manage `[weak self]` in closures to avoid memory leaks.

---
**Unlock the full Senior iOS knowledge in the Playbook.**
[Get the Full Guide](https://fluttertoios.com/pricing)
