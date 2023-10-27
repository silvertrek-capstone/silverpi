import { redirect } from 'next/navigation';

export default function nothing() {
  redirect('/login')
}
