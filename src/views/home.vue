<template>
    <section id="home" class="h-screen flex items-center justify-center bg-gray-900" :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
        <div class="text-center">
            <h1 class="lg:text-6xl text-4xl font-bold font-sans text-white ">Explore In-Depth Details of Every Movie</h1>
            <p class="lg:text-2xl text:lg text-white px-4 font-sans mt-6 mb-6">Dive deep into movie details and learn everything about the films you love.</p>
            <button @click="scrollToSection" class="bg-primary text-white px-6 py-3 font-bold text-xl hover:bg-slate-800 font-sans rounded">Explore <i class="fas fa-chevron-right ml-2"></i></button>
        </div>
    </section>

  <section id="body" class=" bg-slate-950 flex flex-col items-center justify-start pt-7 lg:pt-10">
 
    <div class="w-full px-4 sm:px-4 md:px-36 text-center lg:text-left">
      <h2 class="lg:text-2xl sm:text-2xl font-bold px-3 text-white mb-2 text-2xl">Trending</h2>
    </div>
    <div class="swiper-container mb-10 px-4 pb-1 pt-4">
      <swiper class="mySwiper" :breakpoints="breakpoints" :space-between="10"  :pagination="{
      dynamicBullets: true, bulletClass: `swiper-pagination-bullet swiper-pagination-testClass`}" :modules="modules">
        <swiper-slide v-for="(movie, index) in trendingMovie" :key="index">
          <div class="bg-swiper shadow-md rounded-lg overflow-hidden cursor-pointer" @click="goToDetail(movie.id)">
            <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" class="w-full h-56 object-cover object-center">
            <div class="p-4">
              <h3 class="text-sm font-semibold text-slate-50">{{ movie.title }}</h3>
              <p class="text-sm text-gray-400">{{ formatDate(movie.release_date) }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination"></div>
    </div>

    <div class="w-full px-4 sm:px-4 md:px-36 text-center lg:text-left">
        <h2 class="lg:text-2xl sm:text-2xl font-bold px-3 text-white mb-2 text-2xl">Top Rated</h2>
    </div>
    <div class="swiper-container mb-10 px-4 py-4">
      <swiper class="mySwiper" :breakpoints="breakpoints" :space-between="10" :pagination="{
      dynamicBullets: true, bulletClass: `swiper-pagination-bullet swiper-pagination-testClass`}" :modules="modules">
        <swiper-slide v-for="(movie, index) in topRatedMovie" :key="index">
            <div class="bg-swiper shadow-md rounded-lg overflow-hidden cursor-pointer" @click="goToDetail(movie.id)">
                <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" class="w-full h-56 object-cover object-center">
                <div class="p-4">
                <h3 class="text-sm font-semibold text-slate-50">{{ movie.title }}</h3>
                <p class="text-sm text-gray-400">{{ formatDate(movie.release_date) }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    
    <div class="w-full flex flex-col items-center justify-center text-center pt-10">
      <h1 class="sm:text-4xl md:text-4xl lg:text-5xl text-3xl font-bold text-white mb-2">Discover Your Favorite Movies, Now</h1>
      <p class="text-sm lg:text-lg text-slate-500 mb-7 px-30 sm:px-40 md:px-30 lg:px-48 ">Explore detailed information about your favorite films, from intriguing facts to captivating plotlines. Dive deeper into what makes each movie unique and enrich your viewing experience with our comprehensive insights.</p>
    </div>

    <div class="w-full lg:max-w-xl md:max-w-xl max-w-sm px-4 relative">
    <input 
      type="text" 
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
      placeholder="Search movie..." 
      v-model="search" 
    />
    <ul v-if="search" class="mt-2 bg-white border border-gray-300 rounded-lg shadow-md absolute w-[22rem] lg:w-[34rem] z-50">
      <li v-for="movie in searchMovie" :key="movie.id" @click="goToDetail(movie.id)" class="px-2 cursor-pointer py-2 hover:bg-gray-100 hover:rounded-lg flex items-center">
        <img :src="'https://image.tmdb.org/t/p/w92' + movie.poster_path" alt="Poster" class="w-12 h-auto mr-4">
        <p class="font-bold">{{ movie.title }} <span class="text-slate-400 font-normal">({{ formatYear(movie.release_date) }})</span></p>
      </li>
      <li v-if="notFound" class="px-2 py-2">
        <p  class="mt-2 text-center text-gray-500">Movie not found.</p>
      </li>
    </ul>
  </div>

    <div class="container mx-auto py-10 lg:px-40 md:px-15 sm:px-12 mt-11 px-10 mb-20">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div class="movie-card cursor-pointer" @click="goToDetail(movie.id)" v-for="movie in movieList">
          <img class="w-full h-60 object-cover" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Movie 1">
          <div class="p-4">
            <h2 class="text-sm font-bold mb-2">{{ movie.original_title }}</h2>
            <p class=" text-sm text-gray-600">{{ formatDate(movie.release_date) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="mt-9">
      <div class="text-white">
        {{ trendingMovie }}
      </div>
    </div> -->
  </section>


    <AppFooter/>
</template>

<script>
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import backgroundImage from '../assets/bg-image.jpg';
import AppFooter from '../components/AppFooter.vue'

export default {
  components: {
    AppFooter,
    Swiper,
    SwiperSlide
  },
  setup() {
      return {
        modules: [Pagination],
      };
    },
  data() {
    return {
      backgroundImage,
      search: '',
      searchMovie: [],
      movieList: [],
      topRatedMovie: [],
      trendingMovie: [],
      breakpoints: {
        380:{
          slidesPerView: 2,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 4,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 6,
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 7,
        },
      },
    };
  },
  methods: {
    formatYear(date) {
      const options = { year: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
    goToDetail(id) {
      this.$router.push({ path: `/movie/${id}` });
    },
    scrollToSection() {
      const element = document.getElementById('body');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    formatDate(dateString){
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    },
    async getTrendingMovie(){
        const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2Q0ZmY4NjgyYzExNmU5ZDI5Nzk0ODkwYmNkZTAyYyIsIm5iZiI6MTcyMTcxNzc5My4xMjg0NjMsInN1YiI6IjY2OWY1MWY4MWM1NzQyMDJmZDBhNjc1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3t3qsrOsiFbaGYp-oA3XANNE1D_o3qiipQFU3WZc9Wc'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
        const data = await response.json();
        const result = data.results
        result.forEach(item => {
          this.trendingMovie.push(item)
        });

      } catch (err) {
        console.error(err);
      }
    },
    async getTopRatedMovie(){
        const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2Q0ZmY4NjgyYzExNmU5ZDI5Nzk0ODkwYmNkZTAyYyIsIm5iZiI6MTcyMTcxNzc5My4xMjg0NjMsInN1YiI6IjY2OWY1MWY4MWM1NzQyMDJmZDBhNjc1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3t3qsrOsiFbaGYp-oA3XANNE1D_o3qiipQFU3WZc9Wc'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
        const data = await response.json();
        const result = data.results
        result.forEach(item => {
          this.topRatedMovie.push(item)
        });

      } catch (err) {
        console.error(err);
      }
    },
    async getLitsMovie() {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2Q0ZmY4NjgyYzExNmU5ZDI5Nzk0ODkwYmNkZTAyYyIsIm5iZiI6MTcyMTcxNzc5My4xMjg0NjMsInN1YiI6IjY2OWY1MWY4MWM1NzQyMDJmZDBhNjc1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3t3qsrOsiFbaGYp-oA3XANNE1D_o3qiipQFU3WZc9Wc'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?', options);
        const data = await response.json();
        const result = data.results
        result.forEach(item => {
          this.getDetailMovie(item)
        });

      } catch (err) {
        console.error(err);
      }
    },
    async getDetailMovie(result){
      const idMovie = result.id
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2Q0ZmY4NjgyYzExNmU5ZDI5Nzk0ODkwYmNkZTAyYyIsIm5iZiI6MTcyMTcxNzc5My4xMjg0NjMsInN1YiI6IjY2OWY1MWY4MWM1NzQyMDJmZDBhNjc1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3t3qsrOsiFbaGYp-oA3XANNE1D_o3qiipQFU3WZc9Wc'
        }
      };

      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${idMovie}?language=en-US`, options)
        const data = await response.json();
        this.movieList.push(data)

      } catch (err) {
        console.error(err);
      }
    },
    async getSearchMovie (){
      const search = this.search
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2Q0ZmY4NjgyYzExNmU5ZDI5Nzk0ODkwYmNkZTAyYyIsIm5iZiI6MTcyMTcxNzc5My4xMjg0NjMsInN1YiI6IjY2OWY1MWY4MWM1NzQyMDJmZDBhNjc1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3t3qsrOsiFbaGYp-oA3XANNE1D_o3qiipQFU3WZc9Wc'
        }
      };

      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`, options)
        const data = await response.json();

        if (data.results.length === 0) {
          this.notFound = true; // Tidak ada hasil pencarian
          this.searchMovie = []; // Hapus hasil pencarian
        } else {
          this.searchMovie = data.results;
          this.notFound = false; // Ada hasil pencarian
        }
        console.log(this.notFound)
      } catch (err) {
        console.error(err);
      }
    }
  },
  watch:{
    search() {
      if (this.search.length > 0) {
        this.getSearchMovie(); // Panggil metode pencarian setiap kali nilai search berubah jika ada input
      } else {
        this.searchMovie = []; // Hapus hasil pencarian jika input kosong
      }
    }
  },
  mounted() {
    this.getTrendingMovie()
    this.getTopRatedMovie()
    this.getLitsMovie()
  }
}
</script>

<style scoped>

.mySwiper {
  padding-bottom: 30px;
  border-radius: 0.5rem; /* Radius sudut untuk tampilan rounded */
  overflow: hidden; /* Sembunyikan konten yang melampaui */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow ringan jika diinginkan */
}
.movie-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.movie-card:hover {
  transform: scale(1.05);
}

</style>