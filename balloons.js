document.addEventListener("DOMContentLoaded", function() {
    const elem = document.getElementById('dob');
    const datepicker = new Datepicker(elem, {
        // options
        autohide: true,
        format: 'MM-dd'
      });
      // uncheck all boxes by default (firefox)
      document.querySelectorAll('.form-check-input').forEach(c => c.checked = false);


      // event listener for check/uncheck
    document.getElementById('checkbox-card').addEventListener('change', function(e){
        if (e.target.classList.contains('form-check-input')) {
            const elem = document.getElementById(e.target.id + 'Img');
            elem.style.visibility = "visible";
            elem.classList.remove("animate__animated", "animate__bounceInDown", "animate__bounceOutUp");
            e.target.checked ?
            elem.classList.add("animate__animated", "animate__bounceInDown") :
            elem.classList.add("animate__animated", "animate__bounceOutUp");
        }
    });

    //event listener to check/uncheck all boxes
    document.getElementById('toggle-button').addEventListener('click', function(){
        const checkboxes = document.querySelectorAll('.form-check-input');
        const oppositeChecked = !checkboxes[0].checked;
        checkboxes.forEach(c => c.checked = oppositeChecked);
        checkboxes.forEach(function(c) {
            const elem = document.getElementById(c.id + 'Img');
            elem.style.visibility = "visible";
            elem.classList.remove("animate__animated", "animate__bounceInDown", "animate__bounceOutUp");
            if (c.checked) {
                elem.classList.add("animate__animated", "animate__bounceInDown");
            } else {
                elem.classList.add("animate__animated", "animate__bounceOutUp");
            }
        });
    });
  
    // Randomize attention seekers for h1 element
    const arrayAttentionSeekers = ['animate__bounce', 'animate__flash', 'animate__pulse', 'animate__rubberBand', 'animate__shakeX', 'animate__shakeY', 'animate__headShake', 'animate__swing', 'animate__tada', 'animate__wobble', 'animate__jello', 'animate__heartBeat'];
    const randomAttentionSeeker = arrayAttentionSeekers[Math.floor(Math.random() * arrayAttentionSeekers.length)];
    // console.log(randomAttentionSeeker);
    const h1Element = document.querySelector('h1.greeting');
    if (h1Element){
        h1Element.classList.remove(...arrayAttentionSeekers);
        h1Element.classList.add('animate__animated', randomAttentionSeeker);
    }

    //Change color of h1 element to checkboxes
    const checkboxLabels = document.querySelectorAll('.form-check-label');
    function changeColor(e){
        const color = e.target.dataset.color;
        h1Element.style.color = color;
    }
    function resetColor(){
        h1Element.style.color = '';
    }
    checkboxLabels.forEach(label => {
        label.addEventListener('mouseover', changeColor);
        label.addEventListener('mouseout', resetColor);
    });

    //event listener for submit button if no boxes are checked
    document.getElementById('submit').addEventListener('click', function(e){
        const toastInstance = bootstrap.Toast.getOrCreateInstance(document.getElementById('toastAlert'));
        const checkboxes = document.querySelectorAll('.form-check-input');
        //convert node list to an array
        const isChecked = Array.from(checkboxes).some(c => c.checked);
        if (!isChecked) {
            e.preventDefault();
            toastInstance.show();
        }  
    });
    document.addEventListener('keydown', function(e){
        if (e.key === 'Escape') {
            const toastInstance = bootstrap.Toast.getOrCreateInstance(document.getElementById('toastAlert'));
            toastInstance.dispose();
        }
    });

});