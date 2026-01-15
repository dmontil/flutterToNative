"use client";

import { Navbar } from "@/components/ui/navbar";
import { CodeComparison } from "@/components/ui/code-comparison";
import { PremiumLock } from "@/components/ui/premium-lock";
import { useUser } from "@/components/auth/user-provider";
import { ArrowRight, Check, ChevronRight, Code2, Database, Layers, Layout, Server, Settings, CheckCircle2 } from "lucide-react";

export default function FeatureDivePage() {
    const { hasAccess } = useUser();
    const isPro = hasAccess('ios_premium');

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 pt-32 pb-20">
                <div className="max-w-4xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold tracking-tight mb-6">Deep Dive: Shared Expense Tracker</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Let's build a real feature. No "Counter App" nonsense. We'll implement the "Add Expense" flow for a Splitwise-style app.
                    </p>
                </div>

                {/* Feature Specs */}
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

                {/* Step 1: Domain */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold text-white">1</span>
                        <h2 className="text-2xl font-bold">Domain Layer</h2>
                    </div>
                    <p className="mb-6 text-muted-foreground">
                        We start with the Business Logic Entities and UseCase interfaces. This looks almost identical to Dart Clean Architecture.
                    </p>

                    <CodeComparison
                        title="Entity & UseCase"
                        snippets={[
                            {
                                label: "Swift (Domain)",
                                language: "swift",
                                code: `// Expense.swift
import Foundation

struct Expense: Identifiable, Equatable {
    let id: UUID
    let amount: Decimal
    let description: String
    let payerId: String
    let date: Date
}

// CreateExpenseUseCase.swift
protocol CreateExpenseUseCase {
    func execute(amount: Decimal, description: String, payerId: String) async throws -> Expense
}`,
                                description: "Note usage of `Decimal` for money. `UUID` is standard for IDs. `async throws` replaces `Future<Either<Failure, Expense>>`."
                            },
                            {
                                label: "Flutter (Domain)",
                                language: "dart",
                                code: `// expense_entity.dart
class Expense extends Equatable {
  final String id;
  final double amount;
  final String description;
  final String payerId;
  final DateTime date;

  const Expense({required this.id, ...});

  @override
  List<Object?> get props => [id, amount, ...];
}

// create_expense_usecase.dart
abstract class CreateExpenseUseCase {
  Future<Either<Failure, Expense>> call(CreateExpenseParams params);
}`,
                                description: "Dart needs Equatable for value equality. Swift Structs get it for free (mostly)."
                            }
                        ]}
                    />
                </section>

                {/* Step 2: ViewModel */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold text-white">2</span>
                        <h2 className="text-2xl font-bold">ViewModel (State Management)</h2>
                    </div>
                    <p className="mb-6 text-muted-foreground">
                        Here is where the shift happens. Instead of emitting a Stream of `AddExpenseState`, we publish properties.
                    </p>

                    <CodeComparison
                        title="AddExpenseViewModel"
                        snippets={[
                            {
                                label: "Swift (ViewModel)",
                                language: "swift",
                                code: `@MainActor
class AddExpenseViewModel: ObservableObject {
    // State properties
    @Published var amount: String = ""
    @Published var description: String = ""
    @Published var isLoading: Bool = false
    @Published var errorMessage: String?
    
    // Dependencies
    private let createExpenseUseCase: CreateExpenseUseCase
    
    init(createExpenseUseCase: CreateExpenseUseCase) {
        self.createExpenseUseCase = createExpenseUseCase
    }
    
    func submit() async {
        guard let decimalAmount = Decimal(string: amount), decimalAmount > 0 else {
            errorMessage = "Invalid amount"
            return
        }
        
        isLoading = true
        errorMessage = nil
        
        do {
            _ = try await createExpenseUseCase.execute(
                amount: decimalAmount, 
                description: description, 
                payerId: "current_user"
            )
            // Handle success (e.g. navigation)
        } catch {
            errorMessage = error.localizedDescription
        }
        
        isLoading = false
    }
}`,
                                description: "@MainActor ensures UI updates happen on the main thread. @Published notifies the View to redraw."
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
                                description: "Cubit emits distinct state classes. ViewModel mutates properties."
                            }
                        ]}
                    />
                </section>

                {/* Step 3: UI */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold text-white">3</span>
                        <h2 className="text-2xl font-bold">The View</h2>
                    </div>

                    <CodeComparison
                        title="AddExpenseView"
                        snippets={[
                            {
                                label: "SwiftUI",
                                language: "swift",
                                code: `struct AddExpenseView: View {
    @StateObject private var viewModel: AddExpenseViewModel
    
    init(viewModel: AddExpenseViewModel) {
        _viewModel = StateObject(wrappedValue: viewModel)
    }

    var body: some View {
        Form {
            Section {
                TextField("Description", text: $viewModel.description)
                TextField("0.00", text: $viewModel.amount)
                    .keyboardType(.decimalPad)
            }
            
            if let error = viewModel.errorMessage {
                Text(error).foregroundColor(.red)
            }
            
            Button("Save") {
                Task { await viewModel.submit() }
            }
            .disabled(viewModel.isLoading)
        }
        .navigationTitle("Add Expense")
    }
}`,
                                description: "Declarative, concise. Check how we bind TextFields directly to the ViewModel."
                            }
                        ]}
                    />
                </section>

                {/* Step 4: Data Layer - Repository */}
                <PremiumLock isUnlocked={isPro}>
                    <section className="mb-20">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold text-white">4</span>
                            <h2 className="text-2xl font-bold">Data Layer: Repository Implementation</h2>
                        </div>
                        <p className="mb-6 text-muted-foreground">
                            The Repository is the boundary. It talks to DataSources (API, DB) and maps DTOs to Domain Entities.
                        </p>

                        <CodeComparison
                            title="Repository Implementation"
                            snippets={[
                                {
                                    label: "Swift (Repository)",
                                    language: "swift",
                                    code: `class ExpenseRepositoryImpl: ExpenseRepository {
    private let remoteDataSource: ExpenseRemoteDataSource
    
    init(remoteDataSource: ExpenseRemoteDataSource) {
        self.remoteDataSource = remoteDataSource
    }
    
    func createExpense(amount: Decimal, description: String) async throws -> Expense {
        // 1. Call API
        let dto = try await remoteDataSource.create(amount: amount, desc: description)
        
        // 2. Map DTO -> Domain
        return Expense(
            id: dto.id,
            amount: dto.amount,
            description: dto.desc,
            date: dto.createdAt
        )
    }
}`,
                                    description: "Clean separation. The Domain Layer (Expense) never knows about the API or DTOs."
                                },
                                {
                                    label: "Flutter (Repository)",
                                    language: "dart",
                                    code: `class ExpenseRepositoryImpl implements ExpenseRepository {
  final ExpenseRemoteDataSource remoteDataSource;

  ExpenseRepositoryImpl(this.remoteDataSource);

  @override
  Future<Either<Failure, Expense>> createExpense(...) async {
    try {
      final dto = await remoteDataSource.create(...);
      return Right(dto.toDomain());
    } catch (e) {
      return Left(ServerFailure());
    }
  }
}`,
                                    description: "In Dart, we often use `Either` for errors. In Swift, `throws` is idiomatic."
                                }
                            ]}
                        />
                    </section>

                    {/* Step 5: Data Source & DTOs */}
                    <section className="mb-20">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold text-white">5</span>
                            <h2 className="text-2xl font-bold">Data Source & DTOs (Codable)</h2>
                        </div>
                        <p className="mb-6 text-muted-foreground">
                            This is where Swift shines. `Codable` eliminates the boilerplate of `json_serializable`.
                        </p>

                        <CodeComparison
                            title="DTO & API Call"
                            snippets={[
                                {
                                    label: "Swift (Codable)",
                                    language: "swift",
                                    code: `// DTO
struct ExpenseDTO: Codable {
    let id: UUID
    let amount: Decimal
    let desc: String
    let createdAt: Date
}

// DataSource
class ExpenseRemoteDataSource {
    func create(amount: Decimal, desc: String) async throws -> ExpenseDTO {
        let url = URL(string: "https://api.myapp.com/expenses")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.httpBody = try JSONEncoder().encode(ExpenseRequest(amount: amount, desc: desc))
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard (response as? HTTPURLResponse)?.statusCode == 200 else {
            throw APIError.serverError
        }
        
        return try JSONDecoder().decode(ExpenseDTO.self, from: data)
    }
}`,
                                    description: "No code generation needed! `Codable` handles JSON parsing automatically."
                                },
                                {
                                    label: "Flutter (json_serializable)",
                                    language: "dart",
                                    code: `@JsonSerializable()
class ExpenseDTO {
  final String id;
  // ...
  
  factory ExpenseDTO.fromJson(Map<String, dynamic> json) => _$ExpenseDTOFromJson(json);
}

// DataSource using Dio/Http
final response = await client.post(...);
return ExpenseDTO.fromJson(response.data);`,
                                    description: "Flutter usually requires `build_runner` and code gen for reliable JSON parsing."
                                }
                            ]}
                        />
                    </section>

                    <div className="flex justify-between items-center py-8 border-t border-border">
                        <div className="text-sm text-muted-foreground">
                            Next Section
                        </div>
                        <a href="#" className="flex items-center gap-2 font-bold hover:text-indigo-500 transition-colors">
                            Testing & Resources
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                </PremiumLock>
            </main>
        </div>
    );
}
