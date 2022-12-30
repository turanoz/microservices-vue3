import postscribe from "postscribe";


export default function () {




    function loadScript() {
        document.getElementById("scripts").innerHTML="";
        postscribe('#scripts', `

<!-- Latest jQuery --> 
<script src="/src/assets/js/jquery-3.6.0.min.js"><\/script> 
<!-- jquery-ui --> 
<script src="/src/assets/js/jquery-ui.js"><\/script>
<!-- popper min js -->
<script src="/src/assets/js/popper.min.js"><\/script>
<!-- Latest compiled and minified Bootstrap --> 
<script src="/src/assets/bootstrap/js/bootstrap.min.js"><\/script> 
<!-- owl-carousel min js  --> 
<script src="/src/assets/owlcarousel/js/owl.carousel.min.js"><\/script> 
<!-- magnific-popup min js  --> 
<script src="/src/assets/js/magnific-popup.min.js"><\/script> 
<!-- waypoints min js  --> 
<script src="/src/assets/js/waypoints.min.js"><\/script> 
<!-- parallax js  --> 
<script src="/src/assets/js/parallax.js"><\/script> 
<!-- countdown js  --> 
<script src="/src/assets/js/jquery.countdown.min.js"><\/script> 
<!-- imagesloaded js --> 
<script src="/src/assets/js/imagesloaded.pkgd.min.js"><\/script>
<!-- isotope min js --> 
<script src="/src/assets/js/isotope.min.js"><\/script>
<!-- jquery.dd.min js -->
<script src="/src/assets/js/jquery.dd.min.js"><\/script>
<!-- slick js -->
<script src="/src/assets/js/slick.min.js"><\/script>
<!-- elevatezoom js -->
<script src="/src/assets/js/jquery.elevatezoom.js"><\/script>
<!-- scripts js --> 
<script src="/src/assets/js/scripts.js"><\/script>

`,);
    }


    return {
        loadScript
    }

}
