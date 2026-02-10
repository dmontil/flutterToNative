"use client";

import { Navbar } from "@/components/ui/navbar";
import { CodeComparison } from "@/components/ui/code-comparison";
import { TestTube, ShieldCheck, ArrowRight } from "lucide-react";
import { PremiumLock } from "@/components/ui/premium-lock";
import { useUser } from "@/components/auth/user-provider";

export default function AndroidTestingPage() {
    const { hasAccess, isLoading } = useUser();
    const isPro = hasAccess('android_premium');
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 pt-32 pb-20">
                <div className="max-w-4xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold tracking-tight mb-6">Testing Standards (Android)</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        If you can't test it, you can't ship it. In Android, we use JUnit + Turbine + MockK.
                    </p>
                </div>

                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <TestTube className="h-8 w-8 text-green-500" />
                        <h2 className="text-2xl font-bold">Unit Testing ViewModels</h2>
                    </div>
                    <p className="mb-6 text-muted-foreground">
                        ViewModels are pure Kotlin; test them with coroutine test dispatchers.
                    </p>

                    <CodeComparison
                        title="ViewModel Test"
                        snippets={[
                            {
                                label: "Kotlin (JUnit + Turbine)",
                                language: "kotlin",
                                code: `@OptIn(ExperimentalCoroutinesApi::class)
class LoginViewModelTest {
  private val dispatcher = StandardTestDispatcher()
  private val repo = FakeAuthRepository()
  private lateinit var vm: LoginViewModel

  @Before fun setup() {
    Dispatchers.setMain(dispatcher)
    vm = LoginViewModel(repo)
  }

  @Test fun loginSuccess() = runTest {
    repo.shouldReturnUser = true
    vm.login("test@test.com")
    advanceUntilIdle()
    assertFalse(vm.state.value.isLoading)
  }
}`,
                                description: "Use StandardTestDispatcher to control coroutine timing."
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
                                description: "Flutter's bloc_test is declarative for streams."
                            }
                        ]}
                    />
                </section>

                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <ShieldCheck className="h-8 w-8 text-green-500" />
                        <h2 className="text-2xl font-bold">Mocking Strategies</h2>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                        MockK is the common choice for Kotlin. Keep mocks minimal and prefer fakes for complex flows.
                    </p>
                    <div className="bg-card p-6 rounded-xl border border-border">
                        <pre className="font-mono text-sm text-gray-300">
                            {`class FakeAuthRepository : AuthRepository {
  var shouldReturnUser = false

  override suspend fun login(email: String): User {
    if (shouldReturnUser) return User("1", "Test")
    throw AuthError.Invalid
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
                    <a href="/android/interview" className="flex items-center gap-2 font-bold hover:text-green-500 transition-colors">
                        Interview Resources
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

            </main>
        </div>
    );
}
