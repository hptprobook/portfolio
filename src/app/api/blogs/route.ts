import { NextResponse } from 'next/server';

// Giả lập cơ sở dữ liệu
const todos = [
    { id: 1, title: 'Learn Next.js', completed: false },
    { id: 2, title: 'Build API', completed: true },
];

// GET: Lấy danh sách todos
export async function GET() {
    return NextResponse.json(todos);
}

// POST: Thêm todo mới
export async function POST(request: Request) {
    const body = await request.json();
    if (!body.title) {
        return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    const newTodo = { id: todos.length + 1, title: body.title, completed: false };
    todos.push(newTodo);
    return NextResponse.json(newTodo, { status: 201 });
} 