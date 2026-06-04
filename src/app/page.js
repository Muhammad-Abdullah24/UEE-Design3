import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect root to the website-3 route where your site lives
  redirect('/website-3');
}
