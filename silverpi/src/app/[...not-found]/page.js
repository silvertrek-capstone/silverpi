import {notFound} from "next/navigation"

// This page is simply a requirement for the 404 page. Whenever someone tries to enter a non-existent page the not-found.js page will be shown
export default function NotFoundCatchAll() {
  notFound()
}