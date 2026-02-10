"use client";

import { Navbar } from "@/components/ui/navbar";
import { CodeComparison } from "@/components/ui/code-comparison";
import { TestTube, ShieldCheck, ArrowRight } from "lucide-react";
import { PremiumLock } from "@/components/ui/premium-lock";
import { useUser } from "@/components/auth/user-provider";

export default function TestingPage() {
    const { hasAccess, isLoading } = useUser();
    const isPro = hasAccess('ios_premium');
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 pt-32 pb-20">
                <div className="max-w-4xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold tracking-tight mb-6">Testing Standards</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        If you can't test it, you can't ship it. In iOS, we use XCTest.
                    </p>
                </div>

                {/* Unit Tests */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <TestTube className="h-8 w-8 text-indigo-500" />
                        <h2 className="text-2xl font-bold">Unit Testing ViewModels</h2>
                    </div>
                    <p className="mb-6 text-muted-foreground">
                        Since we inject dependencies via protocol, testing ViewModels is easy.
                    </p>

                    <CodeComparison
                        title="ViewModel Test"
                        snippets={[
                            {
                                label: "Swift (XCTest)",
                                language: "swift",
                                code: `import XCTest
@testable import MyApp

@MainActor
class LoginViewModelTests: XCTestCase {
    var sut: LoginViewModel!
    var mockAuth: MockAuthRepository!

    override func setUp() {
        super.setUp()
        mockAuth = MockAuthRepository()
        sut = LoginViewModel(authRepository: mockAuth)
    }

    func testLoginSuccess() async {
        // Arrange
        mockAuth.shouldReturnUser = true
        
        // Act
        await sut.login(email: "test@test.com")
        
        // Assert
        XCTAssertFalse(sut.isLoading)
        XCTAssertNil(sut.errorMessage)
    }
}`,
                                description: "XCTest is the standard framework. Note `async` support in test methods."
                            },
                            {
                                label: "Flutter (bloc_test)",
                                language: "dart",
                                code: `blocTest<LoginCubit, LoginState>(
  'emits [Loading, Success] when login succeeds',
  build: () => LoginCubit(mockAuth),
  act: (cubit) => cubit.login('test@test.com'),
  expect: () => [
    LoginLoading(),
    LoginSuccess(),
  ],
);`,
                                description: "Flutter's bloc_test is more declarative for streams. Swift tests state properties directly."
                            }
                        ]}
                    />
                </section>

                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                {/* Mocks */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <ShieldCheck className="h-8 w-8 text-indigo-500" />
                        <h2 className="text-2xl font-bold">Mocking Strategies</h2>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                        Swift doesn't have a dynamic mocking library as powerful as `Mockito` due to static typing. We typically write manual mocks conforming to protocols.
                    </p>
                    <div className="bg-card p-6 rounded-xl border border-border">
                        <pre className="font-mono text-sm text-gray-300">
                            {`class MockAuthRepository: AuthRepository {
    var shouldReturnUser = false
    
    func login(email: String) async throws -> User {
        if shouldReturnUser {
            return User(id: "1", name: "Test")
        } else {
            throw AuthError.invalid
        }
    }
}`}
                        </pre>
                    </div>
                </section>
                </PremiumLock>

                <div className="flex justify-between items-center py-8 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                        Next Section
                    </div>
                    <a href="#" className="flex items-center gap-2 font-bold hover:text-indigo-500 transition-colors">
                        Interview Resources
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

            </main>
        </div>
    );
}
