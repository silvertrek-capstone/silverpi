import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'


export default async function Home() {
    const supabase = createServerComponentClient({cookies})
    const {data: {session}} = await supabase.auth.getSession()
    if (!session) {
        redirect("/login")
    }

    const { data: { user } } = await supabase.auth.getUser();
    
    // Basic profile data select, so we can look at first & last name.
    const {data: profile} = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .limit(1)
      .single()

    return (
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Hello, {profile.first_name}!</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
            fugiat veniam occaecat fugiat aliqua.
          </p>
          <form method="POST">

          <button className='justify-center rounded bg-indigo-600 px-3 text-white' formAction="/auth/logout">Sign Out</button>
          </form>
        </div>
      </div>
    )
  }
  