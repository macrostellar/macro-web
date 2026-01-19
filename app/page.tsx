
// Redirect '/' to '/signin' (authentication entry point)
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/signin');
  return null;
}
