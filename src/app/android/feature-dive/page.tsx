"use client";

import { Navbar } from "@/components/ui/navbar";
import { CodeComparison } from "@/components/ui/code-comparison";
import { PremiumLock } from "@/components/ui/premium-lock";
import { useUser } from "@/components/auth/user-provider";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function AndroidFeatureDivePage() {
    const { hasAccess, user, entitlements, isLoading } = useUser();
    const isPro = hasAccess('android_premium');

    console.log('[AndroidFeatureDivePage] 🔍 Current state:', {
        hasUser: !!user,
        userEmail: user?.email,
        entitlements,
        isLoading,
        isPro,
        hasAccessResult: hasAccess('android_premium')
    });

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 pt-32 pb-20">
                <div className="max-w-4xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold tracking-tight mb-6">Deep Dive: Shared Expense Tracker (Android)</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Let's build a real feature in Kotlin + Compose. We'll implement the "Add Expense" flow for a Splitwise-style app.
                    </p>
                </div>

                <section className="mb-20 bg-secondary/20 p-8 rounded-xl border border-border">
                    <h2 className="text-2xl font-bold mb-4">The Feature Spec</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span>User enters amount and description</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span>Selects payer from list of users</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span>Validates input (amount {'>'} 0)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span>Saves asynchronously to backend</span>
                        </li>
                    </ul>
                </section>

                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-bold text-white">1</span>
                        <h2 className="text-2xl font-bold">Domain Layer</h2>
                    </div>
                    <p className="mb-6 text-muted-foreground">
                        Start with pure Kotlin models and use cases. It mirrors Clean Architecture in Flutter.
                    </p>

                    <CodeComparison
                        title="Entity & UseCase"
                        snippets={[
                            {
                                label: "Kotlin (Domain)",
                                language: "kotlin",
                                code: `data class Expense(
  val id: String,
  val amount: BigDecimal,
  val description: String,
  val payerId: String,
  val date: Instant
)

interface CreateExpenseUseCase {
  suspend fun execute(amount: BigDecimal, description: String, payerId: String): Expense
}`,
                                description: "Use BigDecimal for money. Keep domain independent of Android."
                            },
                            {
                                label: "Flutter (Domain)",
                                language: "dart",
                                code: `class Expense extends Equatable {
  final String id;
  final double amount;
  final String description;
  final String payerId;
  final DateTime date;
}

abstract class CreateExpenseUseCase {
  Future<Either<Failure, Expense>> call(CreateExpenseParams params);
}`,
                                description: "Dart needs Equatable for value equality; Kotlin data classes get it for free."
                            }
                        ]}
                    />
                </section>

                <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                    <section className="mb-20">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-bold text-white">2</span>
                            <h2 className="text-2xl font-bold">ViewModel (State Management)</h2>
                        </div>
                        <p className="mb-6 text-muted-foreground">
                            Compose observes StateFlow. You emit a single UiState that drives the entire screen.
                        </p>

                        <CodeComparison
                            title="AddExpenseViewModel"
                            snippets={[
                                {
                                    label: "Kotlin (ViewModel)",
                                    language: "kotlin",
                                    code: `data class AddExpenseUiState(
  val amount: String = "",
  val description: String = "",
  val isLoading: Boolean = false,
  val errorMessage: String? = null
)

@HiltViewModel
class AddExpenseViewModel @Inject constructor(
  private val createExpense: CreateExpenseUseCase
) : ViewModel() {
  private val _state = MutableStateFlow(AddExpenseUiState())
  val state: StateFlow<AddExpenseUiState> = _state

  fun updateAmount(value: String) {
    _state.update { it.copy(amount = value) }
  }

  fun submit(payerId: String) = viewModelScope.launch {
    val amount = _state.value.amount.toBigDecimalOrNull()
    if (amount == null || amount <= BigDecimal.ZERO) {
      _state.update { it.copy(errorMessage = "Invalid amount") }
      return@launch
    }
    _state.update { it.copy(isLoading = true, errorMessage = null) }
    try {
      createExpense.execute(amount, _state.value.description, payerId)
    } catch (e: Exception) {
      _state.update { it.copy(errorMessage = e.message) }
    } finally {
      _state.update { it.copy(isLoading = false) }
    }
  }
}`,
                                    description: "StateFlow is the single source of truth for Compose."
                                },
                                {
                                    label: "Flutter (Cubit)",
                                    language: "dart",
                                    code: `class AddExpenseCubit extends Cubit<AddExpenseState> {
  final CreateExpenseUseCase _useCase;
  AddExpenseCubit(this._useCase) : super(AddExpenseInitial());

  Future<void> submit(String amountStr, String description) async {
    final amount = double.tryParse(amountStr);
    if (amount == null || amount <= 0) {
      emit(AddExpenseError("Invalid amount"));
      return;
    }
    emit(AddExpenseLoading());
    final result = await _useCase(Params(...));
    result.fold(
      (failure) => emit(AddExpenseError(failure.message)),
      (expense) => emit(AddExpenseSuccess()),
    );
  }
}`,
                                    description: "Cubit emits state classes; ViewModel mutates UiState."
                                }
                            ]}
                        />
                    </section>

                    <section className="mb-20">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-bold text-white">3</span>
                            <h2 className="text-2xl font-bold">Compose UI</h2>
                        </div>
                        <CodeComparison
                            title="Compose Screen"
                            snippets={[
                                {
                                    label: "Kotlin (Compose)",
                                    language: "kotlin",
                                    code: `@Composable
fun AddExpenseScreen(vm: AddExpenseViewModel) {
  val state by vm.state.collectAsState()

  Column(Modifier.padding(16.dp)) {
    OutlinedTextField(
      value = state.amount,
      onValueChange = vm::updateAmount,
      label = { Text("Amount") }
    )
    Button(
      onClick = { vm.submit("current_user") },
      enabled = !state.isLoading
    ) { Text("Save") }
  }
}`,
                                    description: "Compose observes state and redraws on updates."
                                },
                                {
                                    label: "Flutter",
                                    language: "dart",
                                    code: `BlocBuilder<AddExpenseCubit, AddExpenseState>(
  builder: (context, state) {
    return Column(
      children: [
        TextField(controller: amountCtrl),
        ElevatedButton(
          onPressed: () => context.read<AddExpenseCubit>().submit(...),
          child: Text("Save"),
        ),
      ],
    );
  },
)`,
                                    description: "Flutter rebuilds the widget subtree on state changes."
                                }
                            ]}
                        />
                    </section>
                </PremiumLock>

                <div className="flex justify-between items-center py-8 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                        Next Section
                    </div>
                    <a href="/android/testing" className="flex items-center gap-2 font-bold hover:text-green-500 transition-colors">
                        Testing Standards
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

            </main>
        </div>
    );
}
