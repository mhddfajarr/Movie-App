<template>
     <nav class="bg-gray-950">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Left side (empty or add logo/menu if needed) -->
        <div class="flex-1"></div>
        
        <!-- Center Title -->
        <div class="text-center flex-1">
          <h1 class="text-white text-2xl font-bold">Overview</h1>
        </div>
        
        <!-- Right side (empty or add links/buttons if needed) -->
        <div class="flex-1"></div>
      </div>
    </div>
  </nav>
  <hr class="border-t-4 border-midnightBlue ">

  <div>
    <div v-if="showVideo" class="fixed inset-0 bg-black bg-opacity-75 lg:px-28 md:px-20 px-7 flex items-center justify-center z-50">
      <div class="relative bg-white rounded-lg  max-w-4xl h-auto w-full">
        <!-- Close Button -->
        <button @click="showVideo = false" class="absolute lg:-top-7 lg:-right-5 -top-4 -right-2 text-red-700 hover:text-red-600 lg:text-2xl text-lg bg-white rounded-full lg:w-12 lg:h-12 w-8 h-8 flex items-center justify-center">
          <i class="fas fa-times"></i>
        </button>

        <!-- Video Content -->
        <iframe :src="'https://www.youtube.com/embed/' + trailerKey" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full lg:h-96 md:h-80"></iframe>
      </div>
    </div>
  </div>
  
<section id="movieDetail" class="bg-slate-950 h-auto">
  <div class="relative w-full mb-0">
    <div class="absolute inset-0 md:hidden lg:hidden">
        <img :src="'https://image.tmdb.org/t/p/w500' + detailMovie.backdrop_path" alt="Movie Poster"class="w-full ">
        <div class="absolute inset-0 bg-black opacity-25"></div>
    </div>
    <!-- Konten lain yang akan menimpa gambar -->
    <div class="relative container mx-auto lg:px-16 lg:py-8 px-6">
        <div class="flex flex-col md:flex-row gap-6">
            <!-- Image Column -->
            <div class="flex-shrink-0 w-full md:w-1/3 flex items-center justify-center md:mt-4 mt-16 lg:mt-0">
                <img :src="'https://image.tmdb.org/t/p/w500' + detailMovie.poster_path"     
                    alt="Movie Poster"
                    class="w-56 h-auto lg:w-72 lg:ml-8 max-w-sm rounded-lg card-detail-movie object-cover">
            </div>
            <!-- Description Column -->
            <div class="flex-1">
                <h1 class="text-white text-3xl mt-7 font-bold">{{ detailMovie.title }}</h1>
                <p class="text-slate-500 mb-6">
                  <i class="fas fa-star text-yellow-500"></i> {{ formattedVoteAverage }}/10 |
                  <span v-for="(genre, index) in detailMovie.genres" :key="genre.id">
                    {{ genre.name }}<span v-if="index < detailMovie.genres.length - 1">, </span>
                  </span>
                </p>
                <button @click="showVideo = true" class="px-4 py-2 bg-blue-500 text-white rounded flex items-center">
                  <i class="fas fa-play mr-2"></i> Watch Trailer
                </button>
                <p class="text-white text-lg mt-7 font-semibold">Overview</p>
                <p class="text-slate-400 mb-2">{{ detailMovie.overview }}</p>
                <p class="text-white text-lg font-semibold">Duration</p>
                <p class="text-slate-400 mb-2">{{ formattedDuration(detailMovie.runtime) }}</p>
                <p class="text-white text-lg font-semibold">Release Date</p>
                <p class="text-slate-400  mb-2">{{ formatDate(detailMovie.release_date) }}</p>
                <p class="text-white text-lg font-semibold">Popularity</p>
                <p class="text-slate-400 mb-4">{{ detailMovie.popularity }}</p>
                <p class="text-white text-lg font-semibold">Production Countries</p>
                <p class="text-slate-400 mb-4">
                  <span v-for="(country, index) in detailMovie.production_countries" :key="country.iso_3166_1">
                    {{ country.name }}<span v-if="index < detailMovie.production_countries.length - 1">, </span>
                  </span>
                </p>
            </div>
        </div>   
    </div>
</div>

    <div class="container mx-auto px-16 lg:py-16 pb-16 w-full">
      <h2 class="text-white lg:text-2xl text-xl font-semibold mb-4">Starring Cast Members</h2>
      <div class="swiper-container-actors mb-10 px-4 py-4 max-w-full">
        <Swiper 
                :breakpoints="breakpoints"
                :spaceBetween="10"
                :pagination="{ dynamicBullets: true, bulletClass: 'swiper-pagination-bullet swiper-pagination-testClass' }"
                :modules="modules">
          <SwiperSlide v-for="(actor, index) in actors" :key="index">
            <div class="bg-swiper-actors h-60 lg:h-72 md:h-72 rounded-lg overflow-hidden text-center mb-7">
              <img :src="actor.profile_path 
                  ? 'https://image.tmdb.org/t/p/w500' + actor.profile_path 
                  : DefaultImage"  :alt="actor.name" class="w-auto h-auto mx-auto ">
              <div class="p-2">
                <p class="text-xs font-semibold  text-slate-50">{{ actor.name }}</p>
                <p class="text-xs text-slate-400">As</p>
                <p class="text-xs font-semibold  text-slate-50">{{ actor.character }}</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- <div class=""> 
        <h2 class="text-white text-2xl font-semibold">Galeri</h2>
      </div> -->
    </div>
</section>
    <AppFooter/>
</template>
  
<script>
import { useRoute } from 'vue-router';
import DefaultImage from '../assets/defaultProfile.png'; 
import AppFooter from '../components/AppFooter.vue';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';

export default {
  data() {
    return {
      DefaultImage,
      showVideo: false,
      trailerKey: null,
      actors: [],
      modules: [Pagination],
      detailMovie: {},
      breakpoints: {
        380:{
          slidesPerView: 3,
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
          slidesPerView: 10,
        },
      },
    };
  },
  computed: {
    formattedVoteAverage() {
      const vote = this.detailMovie.vote_average;
      if (vote !== undefined && vote !== null) {
        return vote.toFixed(1);
      } else {
        return 'N/A';
      }
    }
  },
  components: {
    AppFooter,
    Swiper,
    SwiperSlide
  },
  methods: {
    formattedDuration(runtime) {
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      return `${hours} Hours ${minutes} Minutes`;
    },
    formatDate(dateString){
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    },
    async getDetailMovie(id) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2Q0ZmY4NjgyYzExNmU5ZDI5Nzk0ODkwYmNkZTAyYyIsIm5iZiI6MTcyMTcxNzc5My4xMjg0NjMsInN1YiI6IjY2OWY1MWY4MWM1NzQyMDJmZDBhNjc1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3t3qsrOsiFbaGYp-oA3XANNE1D_o3qiipQFU3WZc9Wc'
        }
      };

      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
        const data = await response.json();
        console.log(data)
        this.detailMovie = data;
      } catch (err) {
        console.error(err);
      }
    },
    async getTrailerMovie(id){
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2Q0ZmY4NjgyYzExNmU5ZDI5Nzk0ODkwYmNkZTAyYyIsIm5iZiI6MTcyMTcxNzc5My4xMjg0NjMsInN1YiI6IjY2OWY1MWY4MWM1NzQyMDJmZDBhNjc1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3t3qsrOsiFbaGYp-oA3XANNE1D_o3qiipQFU3WZc9Wc'
        }
      }
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        const data = await response.json();
        const trailer = data.results.find(video => video.type === 'Trailer');
        this.trailerKey = trailer ? trailer.key : null;
        console.log(this.trailerKey)
      } catch (err) {
        console.error(err);
      }
    },
    async getCreditMovie (id){
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2Q0ZmY4NjgyYzExNmU5ZDI5Nzk0ODkwYmNkZTAyYyIsIm5iZiI6MTcyMTcxNzc5My4xMjg0NjMsInN1YiI6IjY2OWY1MWY4MWM1NzQyMDJmZDBhNjc1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3t3qsrOsiFbaGYp-oA3XANNE1D_o3qiipQFU3WZc9Wc'
        }
      }
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
        const data = await response.json();
        const actors = data.cast
        this.actors = actors;
        console.log(this.actors);
      } catch (err) {
        console.error(err);
      }
    }
  },
  mounted() {
    const route = useRoute();
    const idMovie = route.params.id;
    this.getDetailMovie(idMovie);
    this.getCreditMovie(idMovie);
    this.getTrailerMovie(idMovie)
  }
};
</script>


  