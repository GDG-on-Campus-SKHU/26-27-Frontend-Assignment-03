// 기본 type
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type TodoFilter = 'all' | 'active' | 'done';

// Props로 채워질 type 선언
export type TodoFiltersProps = {
  filter: TodoFilter;
};

export type TodoSummaryProps = {
  totalCount: number;

  doneCount: number;
  onSort: () => void;
};

export type TodoAddFormProps = {
  onAdd: (text: string) => void;
};

export type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
};

export type TodoListProps = {
  todos: Todo[];
  emptyMessage: string;
  emptyDescription: string;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
};

export type TodoPageProps = {
  todos: Todo[];
  onAdd: (text: string) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
  onSort: () => void;
  onClearDone: () => void;
};


// 회원가입 기능의 type
export type SignupValues = {
  username: string;
  password: string;
  passwordConfirm: string;
  interest: 'frontend' | 'backend';
  agreed: boolean;
};
