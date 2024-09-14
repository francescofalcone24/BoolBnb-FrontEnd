<script>
import store from '../data/store.js';
import axios from "axios";
import { RouterLink } from 'vue-router';

export default {

  name: 'AppHeader',


  components: {



  },

  data() {
    return {
      store,

    }
  },

  mounted() {

  }


}


</script>

<template>


  <nav class="navbar my-navbar  m-0 align-items-center" id="my_Bg" >
    <div class="d-flex justify-content-between align-items-center container">
      <div class="w-50 p-2">
        <router-link :to="{ name: 'home' }">
          <img src="../assets/img/BoolBnB.png" class="my-navbar p-0 m-0 img-logo" alt="">
        </router-link>
      </div>
      <div class="w-50" >
       





        <div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="staticBackdropLabel">MENU</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <div>
              <router-link :to="{ name: 'home' }" class="nav-link text-dark"> Home </router-link>
              <a class="text-decoration-none text-dark" href="http://localhost:8000/login">Login</a>
            </div>
          </div>
        </div>






        <ul class="d-flex justify-content-end align-items-center text-decoration-none">
          <li class="nav-item list-group col-3 text-center list-style-none justify-self-center">
            <router-link :to="{ name: 'home' }" class="nav-link my_text_color"> Home </router-link>
          </li>
          <li class="nav-item list-group col-3 text-center list-style-none justify-self-center">
            <a class="text-decoration-none my_text_color" href="http://localhost:8000/login">Login</a>
          </li>
          <li class="nav-item list-group list-style-none text-dark">
            <i class="fa fa-navicon" type="button" aria-hidden="true"  data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" ></i>
          </li>
        </ul>
      </div>

    </div>
  </nav>





</template>

<style scoped>
 .fa-navicon{
    display: none;
  }
.my-navbar {
  
  padding: 0.1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0);
}
#my_Bg{
   background: linear-gradient(110deg, #ffffff 59%, rgba(255, 165, 22,0.875) 61%  70%, rgba(37, 176, 155,0.875) 71% 80%, rgba(240, 51, 85,0.875) 81% 90%, rgba(81, 75, 130,0.875) 91% 100%);
}
.img-logo {
  width: 20%;
  height: 20%;
}
.my_text_color{
  font-size: 22px;
  color: #ffffff;
  font-weight: bold;
    -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: rgb(0, 0, 0);
}
.my_text_color:hover{
  transform: scale(1.15);
}

@media only screen and (max-width: 768px) {
  .img-logo{
    width: 8rem;
  }
  li a{
    display: none;
  }
  .fa-navicon{
    display: block;
  }
  .breack-nav{
    display: flex;
    justify-content: space-between;
  }
}
@media only screen and (max-width: 576px) {
  .img-logo{
    width: 5rem;
    gap: 1rem;
  }
}

</style>
