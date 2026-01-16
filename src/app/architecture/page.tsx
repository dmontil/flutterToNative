"use client";

import { DocLayout } from "@/components/layout/doc-layout";
import { Folder, FileCode, TestTube, Layers, ArrowRight, Zap, Shield } from "lucide-react";
import { CodeComparison } from "@/components/ui/code-comparison";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { PremiumLock } from "@/components/ui/premium-lock";
import { useUser } from "@/components/auth/user-provider";
import { ArchitectureOverviewContent } from "@/content/architecture-overview";
import { MigrationRoadmapContent } from "@/content/migration-roadmap";

const ARCHITECTURE_TOPICS = [
    { title: "Architecture Overview", id: "arch-overview" },
    { title: "Migration Roadmap", id: "migration-roadmap" },
    { title: "MVVM + Clean Architecture", id: "arch-pattern" },
    { title: "Folder Structure", id: "arch-folder" },
    { title: "Navigation: Coordinator", id: "arch-coordinator" },
    { title: "Modularization (SPM)", id: "arch-modularization" },
    { title: "Advanced DI", id: "arch-di" },
];

export default function ArchitecturePage() {
    return (
        <Suspense fallback={<div className="p-8">Loading Architecture...</div>}>
            <ArchitectureContent />
        </Suspense>
    );
}

function ArchitectureContent() {
    const searchParams = useSearchParams();
    const currentTopic = searchParams.get("topic") || "arch-overview";
    const { hasAccess } = useUser();
    const isPro = hasAccess('ios_premium');

    const topic = ARCHITECTURE_TOPICS.find(t => t.id === currentTopic) || ARCHITECTURE_TOPICS[0];

    return (
        <DocLayout title="Architecture Hub" items={ARCHITECTURE_TOPICS} premiumTopics={["arch-folder", "arch-coordinator", "arch-modularization", "arch-di"]}>
            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">{topic.title}</h1>
                <p className="text-xl text-muted-foreground">
                    Building scalable iOS apps. Flutter patterns vs Senior iOS Architecture.
                </p>
            </div>

            {currentTopic === "arch-overview" && <ArchitectureOverviewContent />}

            {currentTopic === "migration-roadmap" && <MigrationRoadmapContent />}

            {currentTopic === "arch-pattern" && (
                <section className="mb-20 space-y-12 animate-in fade-in duration-700">
                    <div className="prose prose-invert max-w-none">
                        <h2 className="text-2xl font-bold text-white mb-6">MVVM + Clean Architecture: The Industry Standard</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            In Flutter, <strong>BLoC</strong> relies on asynchronous streams to push state. In native iOS, while we have Combine/AsyncSequence, the community has converged on <strong>MVVM (Model-View-ViewModel)</strong> because it leverages SwiftUI's native <span className="text-indigo-400 font-semibold">Reactive Data Binding</span> mechanism.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        <div className="bg-card border border-border p-8 rounded-2xl shadow-xl flex flex-col">
                            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                                <Layers className="text-indigo-500 h-5 w-5" /> The ViewModel Rationale
                            </h3>
                            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                Unlike a BLoC that "emits" states, an iOS ViewModel "is" the state. It exposes <code>@Published</code> properties that the View observes directly.
                            </p>
                            <ul className="space-y-4 text-sm mt-auto">
                                <li className="flex items-start gap-3">
                                    <div className="h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5">✔</div>
                                    <span><strong>Unidirectional Flow:</strong> Actions flow Up, Data flows Down.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5">✔</div>
                                    <span><strong>Decoupled Logic:</strong> The VM doesn't know about UIKit or SwiftUI.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5">✔</div>
                                    <span><strong>Testability:</strong> You can test business logic without a simulator.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-indigo-500/5 border border-indigo-500/20 p-8 rounded-2xl flex flex-col justify-center">
                            <h3 className="font-bold text-xl mb-4 text-indigo-400 italic">Senior Tip: Passive Views</h3>
                            <p className="text-base leading-relaxed text-foreground/90">
                                A common junior mistake is putting logic in <code>body</code>. The View should be <strong>Passive</strong>: it just renders what the VM says. If you have an <code>if</code> statement based on a calculation, that calculation belongs in the ViewModel.
                            </p>
                        </div>
                    </div>

                    <CodeComparison
                        title="State Binding: BLoC vs MVVM"
                        snippets={[
                            {
                                label: "Flutter (BLoC)",
                                language: "dart",
                                code: `class CounterBloc extends Bloc<Event, int> {
  CounterBloc() : super(0) {
    on<Increment>((event, emit) => emit(state + 1));
  }
}`
                            },
                            {
                                label: "Swift (MVVM)",
                                language: "swift",
                                code: `class CounterViewModel: ObservableObject {
    @Published var count = 0

    func increment() {
        count += 1 // UI updates automatically
    }
}`
                            }
                        ]}
                    />

                    <div className="mt-16 prose prose-invert max-w-none">
                        <h2 className="text-2xl font-bold text-white mb-6">Real-World Example: Complete Login Flow</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                            Let's build a production-ready Login screen following Clean Architecture + MVVM. This example shows the full stack from Domain → Data → Presentation layers.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold mb-4 text-purple-400">Layer 1: Domain (Business Rules)</h3>
                            <p className="text-sm text-muted-foreground mb-6">Pure Swift, no dependencies. This is the "truth" of your app.</p>

                            <div className="bg-slate-950 p-6 rounded-xl border border-white/10 font-mono text-sm overflow-x-auto">
                                <div className="text-green-400 mb-2">// Domain/Entities/User.swift</div>
                                <pre className="text-slate-300">{`struct User: Equatable {
    let id: String
    let email: String
    let name: String
    let isVerified: Bool
}`}</pre>

                                <div className="text-green-400 mt-6 mb-2">// Domain/Interfaces/AuthRepository.swift</div>
                                <pre className="text-slate-300">{`protocol AuthRepository {
    func login(email: String, password: String) async throws -> User
    func logout() async throws
}`}</pre>

                                <div className="text-green-400 mt-6 mb-2">// Domain/UseCases/LoginUseCase.swift</div>
                                <pre className="text-slate-300">{`final class LoginUseCase {
    private let repository: AuthRepository

    init(repository: AuthRepository) {
        self.repository = repository
    }

    func execute(email: String, password: String) async throws -> User {
        // Validation logic lives here
        guard email.contains("@") else {
            throw LoginError.invalidEmail
        }

        guard password.count >= 8 else {
            throw LoginError.weakPassword
        }

        return try await repository.login(email: email, password: password)
    }
}

enum LoginError: Error {
    case invalidEmail
    case weakPassword
    case unauthorized
    case networkError
}`}</pre>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold mb-4 text-blue-400">Layer 2: Data (Infrastructure)</h3>
                            <p className="text-sm text-muted-foreground mb-6">Implements the repository protocol. Handles HTTP, JSON, persistence.</p>

                            <div className="bg-slate-950 p-6 rounded-xl border border-white/10 font-mono text-sm overflow-x-auto">
                                <div className="text-green-400 mb-2">// Data/Repositories/AuthRepositoryImpl.swift</div>
                                <pre className="text-slate-300">{`final class AuthRepositoryImpl: AuthRepository {
    private let apiClient: APIClient
    private let tokenStore: TokenStore

    init(apiClient: APIClient, tokenStore: TokenStore) {
        self.apiClient = apiClient
        self.tokenStore = tokenStore
    }

    func login(email: String, password: String) async throws -> User {
        let request = LoginRequest(email: email, password: password)

        let response: LoginResponse = try await apiClient.post(
            "/auth/login",
            body: request
        )

        // Save token securely
        try await tokenStore.save(response.token)

        // Map DTO → Domain Entity
        return User(
            id: response.userId,
            email: response.email,
            name: response.name,
            isVerified: response.emailVerified
        )
    }

    func logout() async throws {
        try await tokenStore.clear()
    }
}

// Data Transfer Objects
struct LoginRequest: Encodable {
    let email: String
    let password: String
}

struct LoginResponse: Decodable {
    let userId: String
    let email: String
    let name: String
    let emailVerified: Bool
    let token: String
}`}</pre>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold mb-4 text-indigo-400">Layer 3: Presentation (ViewModel)</h3>
                            <p className="text-sm text-muted-foreground mb-6">Exposes @Published state and action methods. No UIKit/SwiftUI imports.</p>

                            <div className="bg-slate-950 p-6 rounded-xl border border-white/10 font-mono text-sm overflow-x-auto">
                                <div className="text-green-400 mb-2">// Presentation/Login/LoginViewModel.swift</div>
                                <pre className="text-slate-300">{`@MainActor
final class LoginViewModel: ObservableObject {
    // State (what the View observes)
    @Published var email = ""
    @Published var password = ""
    @Published var isLoading = false
    @Published var errorMessage: String?
    @Published var isAuthenticated = false

    // Dependencies
    private let loginUseCase: LoginUseCase

    init(loginUseCase: LoginUseCase) {
        self.loginUseCase = loginUseCase
    }

    // Actions
    func login() async {
        isLoading = true
        errorMessage = nil

        do {
            let user = try await loginUseCase.execute(
                email: email,
                password: password
            )

            // Success: Update state
            isAuthenticated = true

            // Analytics (optional)
            Analytics.track("user_logged_in", properties: [
                "user_id": user.id,
                "verified": user.isVerified
            ])

        } catch LoginError.invalidEmail {
            errorMessage = "Please enter a valid email address"
        } catch LoginError.weakPassword {
            errorMessage = "Password must be at least 8 characters"
        } catch LoginError.unauthorized {
            errorMessage = "Invalid credentials. Please try again."
        } catch {
            errorMessage = "Network error. Please check your connection."
        }

        isLoading = false
    }

    // Computed properties (replace view logic)
    var isLoginButtonEnabled: Bool {
        !email.isEmpty && !password.isEmpty && !isLoading
    }

    var emailFieldError: String? {
        guard !email.isEmpty, !email.contains("@") else { return nil }
        return "Invalid email format"
    }
}`}</pre>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold mb-4 text-purple-400">Layer 4: Presentation (View)</h3>
                            <p className="text-sm text-muted-foreground mb-6">Passive UI. No logic, just bindings and actions.</p>

                            <div className="bg-slate-950 p-6 rounded-xl border border-white/10 font-mono text-sm overflow-x-auto">
                                <div className="text-green-400 mb-2">// Presentation/Login/LoginView.swift</div>
                                <pre className="text-slate-300">{`struct LoginView: View {
    @StateObject var viewModel: LoginViewModel

    var body: some View {
        VStack(spacing: 20) {
            Text("Welcome Back")
                .font(.largeTitle)
                .bold()

            // Email Field
            TextField("Email", text: $viewModel.email)
                .textFieldStyle(.roundedBorder)
                .autocapitalization(.none)
                .keyboardType(.emailAddress)

            if let error = viewModel.emailFieldError {
                Text(error)
                    .font(.caption)
                    .foregroundColor(.red)
            }

            // Password Field
            SecureField("Password", text: $viewModel.password)
                .textFieldStyle(.roundedBorder)

            // Error Message
            if let error = viewModel.errorMessage {
                Text(error)
                    .font(.subheadline)
                    .foregroundColor(.red)
                    .padding()
                    .background(Color.red.opacity(0.1))
                    .cornerRadius(8)
            }

            // Login Button
            Button {
                Task { await viewModel.login() }
            } label: {
                if viewModel.isLoading {
                    ProgressView()
                } else {
                    Text("Log In")
                }
            }
            .buttonStyle(.borderedProminent)
            .disabled(!viewModel.isLoginButtonEnabled)

        }
        .padding()
        .navigationDestination(isPresented: $viewModel.isAuthenticated) {
            HomeView()
        }
    }
}`}</pre>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 prose prose-invert max-w-none">
                        <h2 className="text-2xl font-bold text-white mb-6">Testing Strategy: The Complete Picture</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                            With Clean Architecture, you can test each layer independently. Here's how to achieve 80%+ test coverage.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-card border border-border p-6 rounded-2xl">
                                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                                    <TestTube className="h-5 w-5 text-emerald-500" />
                                    Unit Tests (Domain Layer)
                                </h4>
                                <p className="text-sm text-muted-foreground mb-4">Test business logic in isolation. Fast and reliable.</p>
                                <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                                    <pre className="text-slate-300">{`class LoginUseCaseTests: XCTestCase {
    func testValidLogin() async throws {
        let mockRepo = MockAuthRepository()
        let useCase = LoginUseCase(
            repository: mockRepo
        )

        let user = try await useCase.execute(
            email: "test@example.com",
            password: "password123"
        )

        XCTAssertEqual(user.email, "test@example.com")
        XCTAssertTrue(mockRepo.loginCalled)
    }

    func testInvalidEmail() async {
        let useCase = LoginUseCase(
            repository: MockAuthRepository()
        )

        do {
            _ = try await useCase.execute(
                email: "invalid",
                password: "password123"
            )
            XCTFail("Should throw error")
        } catch LoginError.invalidEmail {
            // Expected
        } catch {
            XCTFail("Wrong error type")
        }
    }
}`}</pre>
                                </div>
                            </div>

                            <div className="bg-card border border-border p-6 rounded-2xl">
                                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                                    <TestTube className="h-5 w-5 text-blue-500" />
                                    ViewModel Tests
                                </h4>
                                <p className="text-sm text-muted-foreground mb-4">Test state changes and user interactions.</p>
                                <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                                    <pre className="text-slate-300">{`@MainActor
class LoginViewModelTests: XCTestCase {
    func testSuccessfulLogin() async {
        let mockUseCase = MockLoginUseCase()
        let vm = LoginViewModel(
            loginUseCase: mockUseCase
        )

        vm.email = "test@example.com"
        vm.password = "password123"

        await vm.login()

        XCTAssertTrue(vm.isAuthenticated)
        XCTAssertNil(vm.errorMessage)
        XCTAssertFalse(vm.isLoading)
    }

    func testInvalidCredentials() async {
        let mockUseCase = MockLoginUseCase(
            shouldFail: true
        )
        let vm = LoginViewModel(
            loginUseCase: mockUseCase
        )

        vm.email = "wrong@example.com"
        vm.password = "wrong"

        await vm.login()

        XCTAssertFalse(vm.isAuthenticated)
        XCTAssertNotNil(vm.errorMessage)
    }
}`}</pre>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-6 rounded-2xl">
                                <h4 className="font-bold text-lg mb-3 text-indigo-400">Mock Objects Pattern</h4>
                                <p className="text-sm text-muted-foreground mb-4">Create mocks for protocols, not concrete classes.</p>
                                <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                                    <pre className="text-slate-300">{`class MockAuthRepository: AuthRepository {
    var loginCalled = false
    var logoutCalled = false
    var shouldFail = false

    func login(
        email: String,
        password: String
    ) async throws -> User {
        loginCalled = true

        if shouldFail {
            throw LoginError.unauthorized
        }

        return User(
            id: "123",
            email: email,
            name: "Test User",
            isVerified: true
        )
    }

    func logout() async throws {
        logoutCalled = true
    }
}`}</pre>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-6 rounded-2xl">
                                <h4 className="font-bold text-lg mb-3 text-emerald-400">Testing Best Practices</h4>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start gap-2">
                                        <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</div>
                                        <span><strong>Test behavior, not implementation.</strong> Don't test that a variable was set; test that the right thing happens.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</div>
                                        <span><strong>Use @MainActor for ViewModels.</strong> Prevents data races when testing async code.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</div>
                                        <span><strong>Mock at the protocol level.</strong> Never mock concrete classes; use protocol-oriented design.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5">4</div>
                                        <span><strong>Fast tests are run frequently.</strong> If tests take {'>'}10s, developers stop running them.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 prose prose-invert max-w-none">
                        <h2 className="text-2xl font-bold text-white mb-6">Performance Optimization Tips</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 p-6 rounded-2xl">
                            <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
                                <Zap className="h-5 w-5 text-yellow-400" />
                            </div>
                            <h4 className="font-bold text-lg mb-2 text-yellow-400">Memory Management</h4>
                            <p className="text-sm text-muted-foreground mb-3">Use [weak self] in closures that outlive the ViewModel.</p>
                            <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs">
                                <pre className="text-slate-300">{`func fetchData() {
    Task { [weak self] in
        let data = try await api.fetch()
        self?.update(data)
    }
}`}</pre>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-6 rounded-2xl">
                            <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                                <Zap className="h-5 w-5 text-blue-400" />
                            </div>
                            <h4 className="font-bold text-lg mb-2 text-blue-400">Debouncing Input</h4>
                            <p className="text-sm text-muted-foreground mb-3">Don't fire API calls on every keystroke.</p>
                            <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs">
                                <pre className="text-slate-300">{`$searchQuery
    .debounce(for: 0.5, scheduler: RunLoop.main)
    .sink { [weak self] query in
        self?.search(query)
    }
    .store(in: &cancellables)`}</pre>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6 rounded-2xl">
                            <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                                <Zap className="h-5 w-5 text-purple-400" />
                            </div>
                            <h4 className="font-bold text-lg mb-2 text-purple-400">Computed vs @Published</h4>
                            <p className="text-sm text-muted-foreground mb-3">Use computed properties for derived state.</p>
                            <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs">
                                <pre className="text-slate-300">{`// ✅ Good: Computed
var isValid: Bool {
    !email.isEmpty && password.count >= 8
}

// ❌ Bad: @Published for derived state
@Published var isValid = false`}</pre>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        <div className="p-6 bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-2xl">
                            <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                                <Shield className="h-6 w-6 text-red-400" />
                            </div>
                            <h4 className="font-bold text-lg mb-2 text-red-400">Anti-Pattern #1: God ViewModels</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                A ViewModel handling Login + Profile + Settings. Split into focused ViewModels: LoginViewModel, ProfileViewModel, etc.
                            </p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl">
                            <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                                <Shield className="h-6 w-6 text-amber-400" />
                            </div>
                            <h4 className="font-bold text-lg mb-2 text-amber-400">Anti-Pattern #2: Direct API Calls</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                ViewModel calling <code>URLSession</code> directly. Always go through the Repository → UseCase layer for testability.
                            </p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-orange-500/10 to-red-600/5 border border-orange-500/20 rounded-2xl">
                            <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                                <Shield className="h-6 w-6 text-orange-400" />
                            </div>
                            <h4 className="font-bold text-lg mb-2 text-orange-400">Anti-Pattern #3: Shared Mutable State</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Multiple ViewModels mutating the same singleton. Use a single source of truth pattern or event bus instead.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 p-10 rounded-3xl">
                        <div className="prose prose-invert max-w-none mb-8">
                            <h3 className="text-2xl font-bold text-white">Key Takeaways: MVVM + Clean Architecture</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex gap-3 items-start">
                                    <div className="h-6 w-6 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-xs shrink-0 mt-0.5">✓</div>
                                    <p className="text-base"><strong>Separation of Concerns:</strong> Domain knows nothing about Data or Presentation. Each layer has one responsibility.</p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="h-6 w-6 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-xs shrink-0 mt-0.5">✓</div>
                                    <p className="text-base"><strong>Testability First:</strong> With proper architecture, 80%+ test coverage is achievable without UI tests.</p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="h-6 w-6 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-xs shrink-0 mt-0.5">✓</div>
                                    <p className="text-base"><strong>Passive Views:</strong> SwiftUI Views should be "dumb" - they render what the ViewModel tells them.</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-3 items-start">
                                    <div className="h-6 w-6 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-xs shrink-0 mt-0.5">✓</div>
                                    <p className="text-base"><strong>Dependency Inversion:</strong> Domain defines interfaces (protocols), Data implements them.</p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="h-6 w-6 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-xs shrink-0 mt-0.5">✓</div>
                                    <p className="text-base"><strong>Memory Safety:</strong> Always use [weak self] in async closures to prevent retain cycles.</p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="h-6 w-6 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-xs shrink-0 mt-0.5">✓</div>
                                    <p className="text-base"><strong>Performance:</strong> Use computed properties for derived state, debounce user input, avoid N+1 queries.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-8 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 rounded-2xl">
                        <h3 className="text-2xl font-bold mb-4 text-white">Want the Full Architecture Playbook?</h3>
                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                            Unlock <strong>Folder Structure</strong>, <strong>Coordinator Pattern</strong>, <strong>SPM Modularization</strong>, and <strong>Advanced DI</strong> strategies used by senior iOS teams at scale.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <div className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/10">
                                ✓ Layer-First vs Feature-First comparison
                            </div>
                            <div className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/10">
                                ✓ Complete folder structure examples
                            </div>
                            <div className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/10">
                                ✓ Navigation without circular dependencies
                            </div>
                            <div className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/10">
                                ✓ Build time optimization with SPM
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <PremiumLock isUnlocked={isPro}>
                {currentTopic === "arch-folder" && (
                    <section className="mb-20 space-y-12">
                        <div className="prose prose-invert max-w-none">
                            <h2 className="text-2xl font-bold text-white mb-4">Folder Structure: The Foundation of Scale</h2>
                            <p className="text-muted-foreground text-lg">
                                Structure isn't just about filing files; it's about <strong>Dependency Inversion</strong>. The Domain layer should NEVER know about the Data layer. Here are 3 battle-tested structures.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 p-6 rounded-xl">
                                <h3 className="font-bold text-xl mb-3 text-indigo-400">Layer-First</h3>
                                <p className="text-sm text-muted-foreground mb-4">Organize by technical layer (Domain, Data, Presentation). Best for small teams.</p>
                                <div className="space-y-2 text-xs font-mono">
                                    <div>📁 Domain/</div>
                                    <div className="ml-4">📁 Entities/</div>
                                    <div className="ml-4">📁 UseCases/</div>
                                    <div>📁 Data/</div>
                                    <div className="ml-4">📁 Repositories/</div>
                                    <div className="ml-4">📁 Network/</div>
                                    <div>📁 Presentation/</div>
                                    <div className="ml-4">📁 Features/</div>
                                </div>
                                <div className="mt-4 p-3 bg-emerald-500/10 rounded text-xs">
                                    <strong>Pro:</strong> Clear separation, easy to navigate
                                </div>
                                <div className="mt-2 p-3 bg-red-500/10 rounded text-xs">
                                    <strong>Con:</strong> One feature touches 3+ folders
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6 rounded-xl">
                                <h3 className="font-bold text-xl mb-3 text-purple-400">Feature-First</h3>
                                <p className="text-sm text-muted-foreground mb-4">Organize by user-facing feature. Best for product velocity.</p>
                                <div className="space-y-2 text-xs font-mono">
                                    <div>📁 Features/</div>
                                    <div className="ml-4">📁 Auth/</div>
                                    <div className="ml-6">📄 LoginView.swift</div>
                                    <div className="ml-6">📄 LoginViewModel.swift</div>
                                    <div className="ml-6">📄 AuthRepository.swift</div>
                                    <div className="ml-4">📁 Checkout/</div>
                                    <div className="ml-4">📁 Profile/</div>
                                    <div>📁 Shared/</div>
                                </div>
                                <div className="mt-4 p-3 bg-emerald-500/10 rounded text-xs">
                                    <strong>Pro:</strong> High velocity, clear ownership
                                </div>
                                <div className="mt-2 p-3 bg-red-500/10 rounded text-xs">
                                    <strong>Con:</strong> Risk of code duplication
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 p-6 rounded-xl">
                                <h3 className="font-bold text-xl mb-3 text-orange-400">Hybrid (Recommended)</h3>
                                <p className="text-sm text-muted-foreground mb-4">Combine both: Layers at top, features within Presentation.</p>
                                <div className="space-y-2 text-xs font-mono">
                                    <div>📁 Domain/</div>
                                    <div className="ml-4">📁 Entities/</div>
                                    <div className="ml-4">📁 UseCases/</div>
                                    <div>📁 Data/</div>
                                    <div className="ml-4">📁 Repositories/</div>
                                    <div>📁 Presentation/</div>
                                    <div className="ml-4">📁 Login/</div>
                                    <div className="ml-4">📁 Checkout/</div>
                                </div>
                                <div className="mt-4 p-3 bg-emerald-500/10 rounded text-xs">
                                    <strong>Pro:</strong> Balance of both approaches
                                </div>
                                <div className="mt-2 p-3 bg-emerald-500/10 rounded text-xs">
                                    <strong>Best for:</strong> Teams of 5+ developers
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 prose prose-invert max-w-none">
                            <h3 className="text-2xl font-bold text-white mb-4">Real Example: E-Commerce App (Layer-First)</h3>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 items-start">
                            <div className="bg-[#0b0e14] p-8 rounded-2xl border border-white/10 font-mono text-sm text-gray-300 shadow-2xl overflow-x-auto">
                                <FolderNode name="EcommerceApp" isOpen>
                                    <FolderNode name="Domain" isOpen>
                                        <FolderNode name="Entities">
                                            <FileNode name="Product.swift" />
                                            <FileNode name="CartItem.swift" />
                                            <FileNode name="Order.swift" />
                                            <FileNode name="User.swift" />
                                        </FolderNode>
                                        <FolderNode name="Interfaces">
                                            <FileNode name="ProductRepository.swift" />
                                            <FileNode name="CartRepository.swift" />
                                            <FileNode name="PaymentGateway.swift" />
                                        </FolderNode>
                                        <FolderNode name="UseCases">
                                            <FileNode name="GetProductsUseCase.swift" />
                                            <FileNode name="AddToCartUseCase.swift" />
                                            <FileNode name="CheckoutUseCase.swift" />
                                        </FolderNode>
                                    </FolderNode>
                                    <FolderNode name="Data" isOpen>
                                        <FolderNode name="Repositories">
                                            <FileNode name="ProductRepositoryImpl.swift" />
                                            <FileNode name="CartRepositoryImpl.swift" />
                                        </FolderNode>
                                        <FolderNode name="Network">
                                            <FileNode name="ProductAPI.swift" />
                                            <FileNode name="StripeAPI.swift" />
                                        </FolderNode>
                                        <FolderNode name="Local">
                                            <FileNode name="CartCache.swift" />
                                            <FileNode name="UserDefaults+Cart.swift" />
                                        </FolderNode>
                                    </FolderNode>
                                    <FolderNode name="Presentation" isOpen>
                                        <FolderNode name="Features">
                                            <FolderNode name="ProductList">
                                                <FileNode name="ProductListView.swift" />
                                                <FileNode name="ProductListViewModel.swift" />
                                            </FolderNode>
                                            <FolderNode name="ProductDetail">
                                                <FileNode name="ProductDetailView.swift" />
                                                <FileNode name="ProductDetailViewModel.swift" />
                                            </FolderNode>
                                            <FolderNode name="Cart">
                                                <FileNode name="CartView.swift" />
                                                <FileNode name="CartViewModel.swift" />
                                            </FolderNode>
                                            <FolderNode name="Checkout">
                                                <FileNode name="CheckoutView.swift" />
                                                <FileNode name="CheckoutViewModel.swift" />
                                                <FileNode name="PaymentViewModel.swift" />
                                            </FolderNode>
                                        </FolderNode>
                                        <FolderNode name="Coordinators">
                                            <FileNode name="AppCoordinator.swift" />
                                            <FileNode name="ShopCoordinator.swift" />
                                        </FolderNode>
                                    </FolderNode>
                                    <FolderNode name="Core">
                                        <FileNode name="DependencyContainer.swift" />
                                        <FileNode name="AppFactory.swift" />
                                    </FolderNode>
                                </FolderNode>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 border-l-4 border-emerald-500 bg-emerald-500/5 rounded-xl">
                                    <h4 className="font-bold text-emerald-400 mb-2 uppercase tracking-widest text-xs">Domain Layer</h4>
                                    <p className="text-sm text-muted-foreground italic mb-3">"What the app does."</p>
                                    <ul className="space-y-2 text-xs">
                                        <li>• <strong>Entities:</strong> Pure data models (Product, Order, User)</li>
                                        <li>• <strong>Interfaces:</strong> Protocols that Data layer implements</li>
                                        <li>• <strong>UseCases:</strong> Business rules (add to cart logic, validation)</li>
                                        <li>• <strong>Zero dependencies</strong> on UIKit, SwiftUI, or Alamofire</li>
                                    </ul>
                                </div>

                                <div className="p-6 border-l-4 border-blue-500 bg-blue-500/5 rounded-xl">
                                    <h4 className="font-bold text-blue-400 mb-2 uppercase tracking-widest text-xs">Data Layer</h4>
                                    <p className="text-sm text-muted-foreground italic mb-3">"How data is fetched."</p>
                                    <ul className="space-y-2 text-xs">
                                        <li>• <strong>Repositories:</strong> Implement Domain protocols</li>
                                        <li>• <strong>Network:</strong> API clients (REST, GraphQL)</li>
                                        <li>• <strong>Local:</strong> Caching, UserDefaults, CoreData</li>
                                        <li>• <strong>DTOs:</strong> Map JSON ↔ Domain Entities</li>
                                    </ul>
                                </div>

                                <div className="p-6 border-l-4 border-purple-500 bg-purple-500/5 rounded-xl">
                                    <h4 className="font-bold text-purple-400 mb-2 uppercase tracking-widest text-xs">Presentation Layer</h4>
                                    <p className="text-sm text-muted-foreground italic mb-3">"How data is shown."</p>
                                    <ul className="space-y-2 text-xs">
                                        <li>• <strong>Views:</strong> SwiftUI components (passive)</li>
                                        <li>• <strong>ViewModels:</strong> @Published state, actions</li>
                                        <li>• <strong>Coordinators:</strong> Navigation logic</li>
                                        <li>• <strong>Depends on:</strong> Domain only (not Data)</li>
                                    </ul>
                                </div>

                                <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl">
                                    <h4 className="font-bold text-indigo-400 mb-2">Dependency Rules</h4>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="text-red-400">❌</span>
                                            <span>Domain → Data (NEVER)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-red-400">❌</span>
                                            <span>Domain → Presentation (NEVER)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-emerald-400">✅</span>
                                            <span>Data → Domain (implements protocols)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-emerald-400">✅</span>
                                            <span>Presentation → Domain (uses UseCases)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 p-8 rounded-2xl">
                            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Decision Framework: Which Structure?</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-card/50 p-5 rounded-xl">
                                    <h4 className="font-bold mb-2">Choose Layer-First if:</h4>
                                    <ul className="text-sm space-y-2 text-muted-foreground">
                                        <li>• Team &lt; 5 developers</li>
                                        <li>• Strong backend team (shared models)</li>
                                        <li>• Need strict architecture enforcement</li>
                                    </ul>
                                </div>
                                <div className="bg-card/50 p-5 rounded-xl">
                                    <h4 className="font-bold mb-2">Choose Feature-First if:</h4>
                                    <ul className="text-sm space-y-2 text-muted-foreground">
                                        <li>• Fast-moving product team</li>
                                        <li>• Need feature independence</li>
                                        <li>• Planning to modularize later (SPM)</li>
                                    </ul>
                                </div>
                                <div className="bg-card/50 p-5 rounded-xl">
                                    <h4 className="font-bold mb-2">Choose Hybrid if:</h4>
                                    <ul className="text-sm space-y-2 text-muted-foreground">
                                        <li>• Team 5-20 developers</li>
                                        <li>• Want best of both worlds</li>
                                        <li>• Complex app with many features</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {currentTopic === "arch-coordinator" && (
                    <section className="mb-20 space-y-8">
                        <div className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <ArrowRight className="h-24 w-24 text-indigo-500 rotate-45" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Navigating like a Pro: Coordinator Pattern</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                                In Flutter, <code>Navigator.push</code> is easy. In a complex iOS app, hardcoding <code>NavigationLink</code> leads to circular dependencies. The Coordinator handles "where to go next", making Views completely modular.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="font-bold text-xl px-2">The Workflow:</h4>
                                <ol className="space-y-4">
                                    <li className="bg-card p-4 rounded-xl border border-border flex gap-4">
                                        <span className="text-indigo-500 font-black">01</span>
                                        <span><strong>Trigger:</strong> View sends a delegate message to the VM or direct to Coordinator.</span>
                                    </li>
                                    <li className="bg-card p-4 rounded-xl border border-border flex gap-4">
                                        <span className="text-indigo-500 font-black">02</span>
                                        <span><strong>Logic:</strong> Coordinator decides which View to instantiate (e.g. Auth vs Home).</span>
                                    </li>
                                    <li className="bg-card p-4 rounded-xl border border-border flex gap-4">
                                        <span className="text-indigo-500 font-black">03</span>
                                        <span><strong>Execution:</strong> Coordinator pushes to the <code>UINavigationController</code>.</span>
                                    </li>
                                </ol>
                            </div>
                            <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 font-mono text-xs">
                                <div className="text-indigo-400 mb-2">// The Coordinator Contract</div>
                                <pre className="text-slate-300">
                                    {`protocol Coordinator: AnyObject {
    var navigation: UINavigationController { get }
    func start()
}

class AppCoordinator: Coordinator {
    func showDetail(item: Item) {
        let vm = DetailVM(item: item)
        let vc = UIHostingController(
            rootView: DetailView(vm: vm)
        )
        navigation.push(vc, animated: true)
    }
}`}
                                </pre>
                            </div>
                        </div>
                    </section>
                )}

                {currentTopic === "arch-modularization" && (
                    <section className="mb-20 space-y-12">
                        <div className="prose prose-invert max-w-none text-center">
                            <h2 className="text-3xl font-bold text-white mb-6">Foundations of Modular Apps</h2>
                            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
                                Compilation times in Swift are notoriously slow. Modularization with <strong>Swift Package Manager (SPM)</strong> is the only way to scale past a few developers.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Feature Modules",
                                    color: "border-sky-500",
                                    icon: <Layers className="text-sky-500" />,
                                    text: "Encapsulate whole flows (e.g. Payment, CoreAuth). Can be developed in isolation."
                                },
                                {
                                    title: "UI Components",
                                    color: "border-purple-500",
                                    icon: <Layers className="text-purple-500" />,
                                    text: "A design system module. Shared across the whole app. No dependencies allowed here."
                                },
                                {
                                    title: "Utilities & Network",
                                    color: "border-amber-500",
                                    icon: <Layers className="text-amber-500" />,
                                    text: "The bottom layer. Shared DTOs, Networking wrappers, and low-level helpers."
                                }
                            ].map((m, i) => (
                                <div key={i} className={`p-8 bg-card border-t-4 ${m.color} rounded-2xl shadow-lg`}>
                                    <div className="mb-4">{m.icon}</div>
                                    <h4 className="font-bold text-lg mb-2">{m.title}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{m.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-card border border-border p-10 rounded-3xl relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full -mr-20 -mt-20" />
                            <h4 className="text-2xl font-bold mb-6 relative z-10 text-white">Why Senior Architecture Matters?</h4>
                            <div className="grid md:grid-cols-2 gap-10 relative z-10">
                                <div className="space-y-5">
                                    <div className="flex gap-4 items-start">
                                        <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs shrink-0 mt-1">✔</div>
                                        <p className="text-base text-muted-foreground leading-relaxed"><strong>Build only what you changed:</strong> SPM caching allows for incremental builds, saving minutes per day.</p>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs shrink-0 mt-1">✔</div>
                                        <p className="text-base text-muted-foreground leading-relaxed"><strong>Enforce encapsulation:</strong> Modules prevent "spaghetti imports" by enforcing public/private boundaries.</p>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    <div className="flex gap-4 items-start">
                                        <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs shrink-0 mt-1">✔</div>
                                        <p className="text-base text-muted-foreground leading-relaxed"><strong>Independent test targets:</strong> Run unit tests for a specific feature in seconds, not minutes.</p>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs shrink-0 mt-1">✔</div>
                                        <p className="text-base text-muted-foreground leading-relaxed"><strong>Ownership & Scalability:</strong> Teams can own specific modules without stepping on each other's git commits.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-12 border-t border-border">
                            <div className="prose prose-invert max-w-none mb-10 text-center">
                                <h3 className="text-2xl font-bold">Choosing your Path: Layer-First vs Feature-First</h3>
                                <p className="text-muted-foreground">The most common question for senior transitions.</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-8 bg-card border border-border rounded-2xl hover:border-indigo-500/50 transition-colors">
                                    <h4 className="font-bold text-xl mb-4 text-indigo-400">Layer-First</h4>
                                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                        Modularize by technical layer: <code>CoreNetwork</code>, <code>Database</code>, <code>UIComponents</code>.
                                    </p>
                                    <ul className="space-y-2 text-xs">
                                        <li className="flex gap-2">Pros: Simple consistency, reuse is forced.</li>
                                        <li className="flex gap-2">Cons: One change requires updating 3+ modules. Slows down feature teams.</li>
                                    </ul>
                                </div>
                                <div className="p-8 bg-card border border-border rounded-2xl hover:border-sky-500/50 transition-colors">
                                    <h4 className="font-bold text-xl mb-4 text-sky-400">Feature-First</h4>
                                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                        Modularize by user value: <code>SearchFeature</code>, <code>CheckoutFeature</code>.
                                    </p>
                                    <ul className="space-y-2 text-xs">
                                        <li className="flex gap-2">Pros: High velocity, team autonomy, clean deletions.</li>
                                        <li className="flex gap-2">Cons: Risks duplicated logic if <code>SharedUtilities</code> isn't managed well.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {currentTopic === "arch-di" && (
                    <section className="mb-20">
                        <CodeComparison
                            title="Pure DI vs Container"
                            snippets={[
                                {
                                    label: "Factory Pattern (Pure DI)",
                                    language: "swift",
                                    code: `// Composition Root
final class AppFactory {
    static func makeHome() -> HomeView {
        let repo = AuthRepositoryImpl()
        let viewModel = HomeViewModel(repository: repo)
        return HomeView(viewModel: viewModel)
    }
}`,
                                    description: "Simplest, type-safe, no libraries needed. Perfect for modular apps."
                                },
                                {
                                    label: "Swinject (Container)",
                                    language: "swift",
                                    code: `// Using Swinject library
let container = Container()
container.register(AuthRepository.self) { _ in AuthRepositoryImpl() }
container.register(HomeViewModel.self) { r in 
    HomeViewModel(repo: r.resolve(AuthRepository.self)!) 
}

let viewModel = container.resolve(HomeViewModel.self)!`,
                                    description: "Like GetIt in Flutter. Runtime resolution (unstable if missing registration)."
                                }
                            ]}
                        />
                    </section>
                )}
            </PremiumLock>

        </DocLayout>
    );
}

function FolderNode({ name, isOpen = false, children }: { name: string, isOpen?: boolean, children?: React.ReactNode }) {
    return (
        <div className="ml-4">
            <div className="flex items-center gap-2 py-1 text-blue-400">
                <Folder className="h-4 w-4" />
                <span>{name}</span>
            </div>
            {isOpen && <div className="ml-2 border-l border-white/10 pl-2">{children}</div>}
        </div>
    );
}

function FileNode({ name }: { name: string }) {
    return (
        <div className="ml-4 flex items-center gap-2 py-1 text-gray-400">
            <FileCode className="h-4 w-4" />
            <span>{name}</span>
        </div>
    );
}
