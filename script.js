window.onload = function(){

  // navigation

  const navigation = document.querySelector('.navigation');
  const hamburger = document.querySelector('.hamburger');
  const navigationOverlay = document.querySelector('.navigation-overlay');
  const logo = document.querySelector('.logo');
  let isShown;

  function showNav(){
    isShown = true;
    navigation.classList.add('display-toggle');
    navigationOverlay.classList.add('display-toggle');
    hamburger.style.transform = 'rotate(-90deg)';
    logo.classList.add('logo-to-left');
  }

  function hideNav () {
    isShown = false;
    navigation.classList.remove('display-toggle');
    navigationOverlay.classList.remove('display-toggle');
    hamburger.style.transform = 'rotate(0)';
    logo.classList.remove('logo-to-left');
  }

  hamburger.addEventListener('click', () =>{
    if(!isShown){
      showNav();
    }else{
      hideNav();
    }
  })

  navigationOverlay.addEventListener('click', () =>{
    hideNav();
  })

    // link active

  navigation.addEventListener('click', (event) =>{
    if(event.target.classList.contains('navigation__link')){
      navigation.querySelectorAll('a').forEach((el) => {
        el.classList.remove('navigation__link_active');
        hideNav();
      });
      event.target.classList.add('navigation__link_active');
    }
  })

    // scroll

  document.addEventListener('scroll', onScroll);

  function onScroll(event){
    const curPos = window.scrollY + 95;
    const sections = document.querySelectorAll('body>section');
    const links = document.querySelectorAll('.navigation a');

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
  const verticalBlueIphoneScreen = document.querySelector('.vertical-blue-iphone_black-screen');
  
  document.querySelector('.vertical-blue-iphone_btn').addEventListener('click', () => {
    if(verticalBlueIphoneScreen.style.opacity == 1){
      verticalBlueIphoneScreen.style.opacity = 0;
    }else{
      verticalBlueIphoneScreen.style.opacity = 1;
    }
  })

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

  let slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  let isEnabled = true;

  function changeCurrentSlide(n){
    currentSlide = (n + slides.length) % slides.length;
  }

  function hideSlide(direction){
    isEnabled = false;
    slides[currentSlide].classList.add(direction);
    slides[currentSlide].addEventListener('animationend', function(){
      this.classList.remove('active', direction);
    });
  }

  function showSlide(direction){
    slides[currentSlide].classList.add('next', direction);
    slides[currentSlide].addEventListener('animationend', function(){
      this.classList.remove('next', direction);
      this.classList.add('active');
      isEnabled = true;
    });
  }

  function nextSlide(n){
    hideSlide('to-left');
    changeCurrentSlide(n + 1);
    showSlide('from-right');
  }

  function previousSlide(n){
    hideSlide('to-right');
    changeCurrentSlide(n - 1);
    showSlide('from-left');
  }

  document.querySelector('.fa-angle-left').addEventListener('click', function(){
    if(isEnabled){
      previousSlide(currentSlide);
    }
  });

  document.querySelector('.fa-angle-right').addEventListener('click', function(){
    if(isEnabled){
      nextSlide(currentSlide);
    }
  });

  // portfolio

  let portfolioImages = document.querySelector('.portfolio__images');
  let portfolioTags = document.querySelector('.portfolio__tags');

  portfolioImages.addEventListener('click', (event) =>{
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