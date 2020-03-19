window.onload = function(){
  const navigation = document.getElementById('navigation');

  // navigation

  navigation.addEventListener('click', (event) =>{
    navigation.querySelectorAll('a').forEach(el => el.classList.remove('navigation__link_active'));
    event.target.classList.add('navigation__link_active');
  })

  document.addEventListener('scroll', onScroll);
  function onScroll(event){
    const curPos = window.scrollY + 95;
    const sections = document.querySelectorAll('main>section');
    const links = document.querySelectorAll('#navigation a');
    const header = document.getElementById('home');
    const contact = document.getElementById('contact');

    if(header.offsetTop <= curPos && (header.offsetTop + header.offsetHeight) > curPos){
      links.forEach(a =>{
        a.classList.remove('navigation__link_active');
        if(header.getAttribute('id') === a.getAttribute('href').substring(1)){
          a.classList.add('navigation__link_active');
        }
      })
    }

    sections.forEach(el => {
      if(el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos){
        links.forEach(a =>{
          a.classList.remove('navigation__link_active');
          if(el.getAttribute('id') === a.getAttribute('href').substring(1)){
            a.classList.add('navigation__link_active');
          }
        })
      }
    })
  }
  
  // iphones black-screens

  const verticalIphoneScreen = document.querySelector('.vertical-iphone_black-screen');
  const horizontalIphoneScreen = document.querySelector('.horizontal-iphone_black-screen');

  document.querySelector('.vertical-iphone_btn').addEventListener('click', () => {
    if(verticalIphoneScreen.style.opacity == 1){
      verticalIphoneScreen.style.opacity = 0;
    }else{
      verticalIphoneScreen.style.opacity = 1;
    }
  })

  document.querySelector('.horizontal-iphone_btn').addEventListener('click', () => {
    if(horizontalIphoneScreen.style.opacity == 1){
      horizontalIphoneScreen.style.opacity = 0;
    }else{
      horizontalIphoneScreen.style.opacity = 1;
    }
  })

  // slider

  let sliderPrevBtn = document.querySelector('.fa-angle-left');
  let sliderNextBtn = document.querySelector('.fa-angle-right');
  let slides = document.querySelectorAll('.slide');
  let slideIndex = 0;

  sliderNextBtn.addEventListener('click', function (){
    slides[slideIndex].classList.remove('showed');
    slideIndex++;
    if(slideIndex >= slides.length){
      slideIndex = 0;
    }
    slides[slideIndex].classList.add('showed');
  })

  sliderPrevBtn.addEventListener('click', function (){
    slides[slideIndex].classList.remove('showed');
    slideIndex--;
    if(slideIndex < 0){
      slideIndex = slides.length - 1;
    }
    slides[slideIndex].classList.add('showed');
  })

  // portfolio

  let portfolioImages = document.querySelector('.portfolio__images');
  let portfolioTags = document.querySelector('.portfolio__tags');

  portfolioImages.addEventListener('click', (event) =>{
    console.log(event);
    if(event.target.classList.contains('image')){
      portfolioImages.querySelectorAll('img').forEach(img => img.classList.remove('portfolio__tag_active'));
      event.target.classList.add('portfolio__tag_active');
    }
  })

  portfolioTags.addEventListener('click', (event) =>{
    if(event.target.classList.contains('tag')){
      let clickedTag = event.target;
      removeSelectedTags();
      selectClickedTag(clickedTag);
      filterImagesBySelectedTag();
    }
  })

  const removeSelectedTags = () =>{
    let tags = document.querySelectorAll('.portfolio__tag');
    tags.forEach(tag =>{
      tag.classList.remove('tag_selected');
    })
  }

  const selectClickedTag = (clickedTag) => {
    clickedTag.classList.add('tag_selected');
  }

  const filterImagesBySelectedTag = () =>{
    let images = Array.from(document.querySelectorAll('.portfolio__images img'));
    images.sort(function(a, b){return 0.5 - Math.random()});

    images.forEach(image => {
      document.querySelector('.portfolio__images').appendChild(image);
    });
  }

  // quote form

  const quoteForm = document.querySelector('.quote__form');
  const submitFormButton = document.querySelector('.form__submit');
  const overlay = document.querySelector('.form__overlay');
  const popUp = document.querySelector('.pop-up');
  const closePopUpButton = document.querySelector('.pop-up__button');

  submitFormButton.addEventListener('click', function (event){
    let formName = document.querySelector('.form__name');
    let formEmail = document.querySelector('.form__email');
    let formProject = document.querySelector('.form__project');
    let formSubject = document.querySelector('.form__subject');
    let popUpProject = document.querySelector('.pop-up__project');
    let popUpSubject = document.querySelector('.pop-up__subject');

    if(formName.checkValidity() && formEmail.checkValidity()){
      event.preventDefault();
      overlay.style.visibility = 'visible';
      popUp.style.visibility = 'visible';
      if(formSubject.value.trim() != ''){
        popUpSubject.textContent = 'Тема: ' + formSubject.value;
      }else{
        popUpSubject.textContent = 'Без темы';
      }

      if(formProject.value.trim() != ''){
        popUpProject.textContent = 'Описание: ' + formProject.value;
      }else{
        popUpProject.textContent = 'Без описания';
      }
    }
  })

  closePopUpButton.addEventListener('click', function () {
    let form = Array.from(quoteForm);
    overlay.style.visibility = 'hidden';
    popUp.style.visibility = 'hidden';
    form.forEach(el => {
      if(el != submitFormButton){
        el.value = '';
      }
    });
  })

  overlay.addEventListener('click', function () {
    let form = Array.from(quoteForm);
    overlay.style.visibility = 'hidden';
    popUp.style.visibility = 'hidden';
    form.forEach(el => {
      if(el != submitFormButton){
        el.value = '';
      }
    });
  })

}