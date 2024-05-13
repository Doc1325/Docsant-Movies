import { useEffect, useRef } from 'react'
import './styles/HomePage.css'
import { Movies } from '../components/Movies'
import { useMovies } from '../hooks/useMovies'
import Slideshow from '../components/Gallery'
import { NavMenu } from '../components/NavMenu'
import debounce from 'just-debounce-it'
export function HomePage ({ type }) {
  const page = useRef(1)
  const { movies, getMovies, loading } = useMovies({ search: '', sort: false })

  useEffect(() => {
    getMovies({ search: '', type, page: page.current })// paso el objeto en si
    const handleScroll = debounce(() => {
      console.log('d')
      if (movies) {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
          page.current = page.current + 1
          getMovies({ search: '', type, page: page.current })// paso el objeto en si
        }
      }
    }, 200)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const title = {
    tv: 'series',
    movie: 'Peliculas'

  }

  return (
    <div className='homepage' id='page'>

      {/* {<h1 className='page-title'>{title[type]}</h1>} */}
      <div>
        <NavMenu main />

        {loading ? null : <Slideshow movies={movies?.slice(0, 5)} />}

      </div>

      <main>
        <Movies movies={{ movies, type: null }} loading={loading} />
      </main>
    </div>
  )
}
