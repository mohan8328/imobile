import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { fetchJson } from '../services/fetchJson';
import { colors } from '../theme/colors';

type Quote = { id: number; quote: string; author: string };
type QuotesRes = { quotes: Quote[] };

type Todo = { id: number; todo: string; completed: boolean };
type TodosRes = { todos: Todo[] };

export function PayHubScreen() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [q, t] = await Promise.all([
          fetchJson<QuotesRes>('https://dummyjson.com/quotes?limit=5'),
          fetchJson<TodosRes>('https://dummyjson.com/todos?limit=6&skip=5'),
        ]);
        if (!cancelled) {
          setQuotes(q.quotes ?? []);
          setTodos(t.todos ?? []);
        }
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : 'Failed');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.orange} size="large" />
      </View>
    );
  }

  if (err) {
    return (
      <View style={styles.center}>
        <Text style={styles.err}>{err}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.h2}>Reminders</Text>
      <Text style={styles.sub}>Todos from dummyjson.com</Text>
      {todos.map((todo) => (
        <View key={todo.id} style={styles.card}>
          <Text style={[styles.todo, todo.completed && styles.done]}>{todo.todo}</Text>
          <Text style={styles.meta}>{todo.completed ? 'Done' : 'Pending'} · #{todo.id}</Text>
        </View>
      ))}
      <Text style={[styles.h2, { marginTop: 20 }]}>Quotes</Text>
      <Text style={styles.sub}>dummyjson.com/quotes</Text>
      {quotes.map((q) => (
        <View key={q.id} style={styles.card}>
          <Text style={styles.quote}>“{q.quote}”</Text>
          <Text style={styles.author}>— {q.author}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.pageBg,
    padding: 24,
  },
  err: { color: colors.maroon, textAlign: 'center' },
  wrap: { padding: 16, paddingBottom: 40 },
  h2: { fontSize: 18, fontWeight: '700', color: colors.ink },
  sub: { fontSize: 13, color: colors.muted, marginBottom: 12, marginTop: 4 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.line,
  },
  todo: { fontSize: 15, color: colors.ink },
  done: { textDecorationLine: 'line-through', color: colors.muted },
  meta: { fontSize: 12, color: colors.muted, marginTop: 6 },
  quote: { fontSize: 15, color: colors.ink, lineHeight: 22, fontStyle: 'italic' },
  author: { marginTop: 8, fontSize: 13, color: colors.muted },
});
