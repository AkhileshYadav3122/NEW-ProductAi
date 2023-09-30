// import Typed from "typed.js";
// import Pristine from "pristinejs";

// const NioApp = {
//     Break: {
//       sm: 576,
//       md: 768,
//       lg: 992,
//       xl: 1200,
//       xxl: 1400
//     }
//   };

// (function (e) {
//   "use strict";

//   const classes = {
//     main: "nk-menu",
//     item: "nk-menu-item",
//     link: "nk-menu-link",
//     toggle: "nk-menu-toggle",
//     dropdown: "nk-menu-dropdown",
//     dropdownparent: "has-dropdown",
//     active: "active",
//     current: "current-page"
//   };

//   e.Dropdown = {
//     load: function (element, className) {
//       let parent = element.parentElement;
//       if (!parent.classList.contains(className)) {
//         parent.classList.add(className);
//       }
//     },
//     toggle: function (element, className) {
//       let parent = element.parentElement;
//       let dropdown = element.nextElementSibling;
//       let duration = dropdown.children.length > 5 ? 400 + 10 * dropdown.children.length : 400;

//       if (parent.classList.contains(className)) {
//         parent.classList.remove(className);
//         e.SlideUp(dropdown, duration);
//       } else {
//         parent.classList.add(className);
//         e.SlideDown(dropdown, duration);
//       }
//     },
//     closeSiblings: function (element, activeClass, parentClass, dropdownClass) {
//       let parent = element.parentElement;
//       let siblings = parent.parentElement.children;

//       Array.from(siblings).forEach((sibling) => {
//         if (sibling !== parent && sibling.classList.contains(activeClass)) {
//           let dropdowns = sibling.querySelectorAll("." + dropdownClass);
//           dropdowns.forEach((dropdown) => {
//             dropdown.parentElement.classList.remove(activeClass);
//             e.SlideUp(dropdown, 400);
//           });
//         }
//       });
//     }
//   };


  
//   e.Dropdown.header = function (selector) {
//     const headerMenuToggles = document.querySelectorAll(selector);
//     const activeClass = classes.active;
//     const dropdownParentClass = classes.dropdownparent;
//     const dropdownClass = classes.dropdown;
//     const breakpoint = document.body.dataset.menuCollapse
//       ? e.Break[document.body.dataset.menuCollapse]
//       : e.Break.lg;

//     headerMenuToggles.forEach((toggle) => {
//       e.Dropdown.load(toggle, dropdownParentClass);
//       toggle.addEventListener("click", function (event) {
//         event.preventDefault();
//         if (window.innerWidth < breakpoint) {
//           e.Dropdown.toggle(toggle, activeClass);
//           e.Dropdown.closeSiblings(toggle, activeClass, dropdownParentClass, dropdownClass);
//         }
//       });
//     });
//   };

//   const navbarClasses = {
//     root: "nk-header-main",
//     base: "nk-header-menu",
//     toggle: "header-menu-toggle",
//     toggleActive: "active",
//     active: "header-menu-active",
//     overlay: "header-menu-overlay",
//     body: "header-menu-shown"
//   };

//   const navbarBreakpoints = {
//     main: document.body.dataset.menuCollapse
//       ? e.Break[document.body.dataset.menuCollapse]
//       : e.Break.lg
//   };

//   e.Navbar = {
//     show: function (toggles, baseElement) {
//       toggles.forEach((toggle) => {
//         toggle.classList.add(navbarClasses.toggleActive);
//       });
//       baseElement.classList.add(navbarClasses.active);
//       document.body.classList.add(navbarClasses.body);
//       const overlay = `<div class='${navbarClasses.overlay}'></div>`;
//       baseElement.insertAdjacentHTML("beforebegin", overlay);
//     },
//     hide: function (toggles, baseElement) {
//       toggles.forEach((toggle) => {
//         toggle.classList.remove(navbarClasses.toggleActive);
//       });
//       baseElement.classList.remove(navbarClasses.active);
//       document.body.classList.remove(navbarClasses.body);
//       const overlay = document.querySelector("." + navbarClasses.overlay);
//       setTimeout(() => {
//         if (overlay) {
//           overlay.remove();
//         }
//       }, 400);
//     },
//     mobile: function (baseElement) {
//       if (navbarBreakpoints.main < window.innerWidth) {
//         baseElement.classList.remove("menu-mobile");
//       } else {
//         setTimeout(() => {
//           baseElement.classList.add("menu-mobile");
//         }, 500);
//       }
//     },
//     sticky: function (elementSelector) {
//       const elements = document.querySelectorAll(elementSelector);
//       elements.forEach((element) => {
//         let offsetTop = element.offsetTop;
//         window.addEventListener("scroll", function () {
//           if (window.scrollY > offsetTop) {
//             element.classList.add("has-fixed");
//           } else {
//             element.classList.remove("has-fixed");
//           }
//         });
//       });
//     },
//     height: function (elementSelector) {
//       const elements = document.querySelectorAll(elementSelector);
//       elements.forEach((element) => {
//         document.querySelector("html").style.setProperty("--header-main-height", element.offsetHeight + "px");
//       });
//     }
//   };

//   e.Navbar.init = function () {
//     const baseElement = document.querySelector("." + navbarClasses.base);
//     const toggleElements = document.querySelectorAll("." + navbarClasses.toggle);

//     toggleElements.forEach((toggle) => {
//       e.Navbar.mobile(baseElement);

//       toggle.addEventListener("click", function (event) {
//         event.preventDefault();
//         if (navbarBreakpoints.main > window.innerWidth) {
//           if (baseElement.classList.contains(navbarClasses.active)) {
//             e.Navbar.hide(toggleElements, baseElement);
//           } else {
//             e.Navbar.show(toggleElements, baseElement);
//           }
//         }
//       });

//       window.addEventListener("resize", function () {
//         if (navbarBreakpoints.main < window.innerWidth) {
//           e.Navbar.hide(toggleElements, baseElement);
//         }
//         e.Navbar.mobile(baseElement);
//       });

//       document.addEventListener("mouseup", function (event) {
//         if (!event.target.closest("." + navbarClasses.base)) {
//           e.Navbar.hide(toggleElements, baseElement);
//         }
//       });
//     });

//     e.Navbar.sticky(".nk-header ." + navbarClasses.root);

//     window.addEventListener("scroll", function () {
//       e.Navbar.height(".nk-header ." + navbarClasses.root);
//     });

//     window.addEventListener("resize", function () {
//       e.Navbar.height(".nk-header ." + navbarClasses.root);
//     });
//   };

//   e.CurrentLink = function (linkSelector, itemClass, subClass, mainClass, activeClasses, scrollIntoView) {
//     const links = document.querySelectorAll(linkSelector);
//     const currentUrl = document.location.href;
//     const currentPath = currentUrl.substring(0, currentUrl.indexOf("#") === -1 ? currentUrl.length : currentUrl.indexOf("#"));
//     const currentQuery = currentPath.substring(0, currentPath.indexOf("?") === -1 ? currentPath.length : currentPath.indexOf("?"));

//     links.forEach(function (link) {
//       const href = link.getAttribute("href");
//       if (currentQuery.match(href)) {
//         e.getParents(link, "." + mainClass, itemClass).forEach((parent) => {
//           parent.classList.add(...activeClasses);
//           let subElement = parent.querySelector("." + subClass);
//           if (subElement !== null) {
//             subElement.style.display = "block";
//           }
//         });
//         if (scrollIntoView) {
//           link.scrollIntoView({
//             block: "end"
//           });
//         }
//       } else {
//         link.parentElement.classList.remove(...activeClasses);
//       }
//     });
//   };

//   e.Addons = {};

//   e.Addons.typed = function (selector) {
//     let typedElements = document.querySelectorAll(selector);
//     typedElements.forEach((element) => {
//       let strings = JSON.parse("[" + element.dataset.strings + "]");
//       new Typed(element, {
//         strings: strings,
//         typeSpeed: 100,
//         backSpeed: 0,
//         backDelay: 1000,
//         startDelay: 0,
//         loop: true
//       });
//     });
//   };

//   e.Addons.pristine = function (element, config) {
//     let formControlWrapClass = "form-control-wrap";
//     return new Pristine(element, {
//       classTo: formControlWrapClass,
//       errorClass: "form-error",
//       successClass: "form-sucess",
//       errorTextParent: formControlWrapClass,
//       errorTextTag: "span",
//       errorTextClass: "form-error-message"
//     }, config);
//   };

//   e.Custom = {};

//   e.Custom.submitForm = function (selector) {
//     let formElements = document.querySelectorAll(selector);
//     formElements.forEach((form) => {
//       const action = form.dataset.action;
//       let pristineInstance = e.Addons.pristine(form, true);

//       form.addEventListener("submit", function (event) {
//         event.preventDefault();
//         let isValid = pristineInstance.validate();
//         let formResult = form.querySelector(".form-result");

//         if (isValid) {
//           let formData = new FormData(form);
//           const xhr = new XMLHttpRequest();
//           xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//               let response = null;
//               try {
//                 response = JSON.parse(xhr.responseText);
//               } catch (error) {}

//               formResult.classList.add("form-result-show");
//               formResult.style.display = "block";

//               if (response) {
//                 formResult.innerHTML = response.message;
//                 if (response.result === "success") {
//                   formResult.classList.add("form-result-success");
//                   formResult.classList.remove("form-result-error");
//                   setTimeout(() => {
//                     formResult.style.display = "none";
//                   }, 8000);
//                 } else {
//                   formResult.classList.add("form-result-error");
//                   formResult.classList.remove("form-result-success");
//                 }
//               } else {
//                 formResult.classList.remove("form-result-success");
//                 formResult.classList.add("form-result-error");
//                 formResult.innerHTML = "error";
//               }
//             }
//           };

//           xhr.open("POST", action, true);
//           xhr.send(formData);
//           form.reset();
//         }
//       });
//     });
//   };

//   e.Custom.priceToggle = function (selector) {
//     let toggles = document.querySelectorAll(selector);
//     toggles.forEach((toggle) => {
//       toggle.addEventListener("click", function () {
//         let parent = toggle.closest("." + toggle.dataset.parent);
//         let targets = document.querySelectorAll("." + toggle.dataset.target);

//         if (parent.classList.contains("pricing-yearly")) {
//           parent.classList.remove("pricing-yearly");
//         } else {
//           parent.classList.add("pricing-yearly");
//         }

//         targets.forEach((target) => {
//           if (target.classList.contains("show-yearly")) {
//             target.classList.remove("show-yearly");
//           } else {
//             target.classList.add("show-yearly");
//           }
//         });
//       });
//     });
//   };

//   e.Custom.showHidePassword = function (selector) {
//     let toggles = document.querySelectorAll(selector);
//     toggles.forEach((toggle) => {
//       toggle.addEventListener("click", function (event) {
//         event.preventDefault();
//         let targetId = toggle.getAttribute("href");
//         let targetElement = document.getElementById(targetId);

//         if (targetElement.type === "password") {
//           targetElement.type = "text";
//           toggle.classList.add("is-shown");
//         } else {
//           targetElement.type = "password";
//           toggle.classList.remove("is-shown");
//         }
//       });
//     });
//   };

//   e.Custom.darkmode = function (selector) {
//     let toggles = document.querySelectorAll(selector);
//     toggles.forEach((toggle) => {
//       toggle.addEventListener("click", function () {
//         if (document.body.classList.contains("is-dark")) {
//           document.body.classList.remove("is-dark");
//         } else {
//           document.body.classList.add("is-dark");
//         }

//         toggles.forEach((toggle) => {
//           if (toggle.classList.contains("dark-active")) {
//             toggle.classList.remove("dark-active");
//           } else {
//             toggle.classList.add("dark-active");
//           }
//         });
//       });
//     });
//   };

//   e.Custom.init = function () {
//     e.Navbar.init();
//     e.Addons.typed(".type-init");
//     e.Custom.submitForm(".form-submit-init");
//     e.Custom.priceToggle(".pricing-toggle");
//     e.Custom.showHidePassword(".password-toggle");
//     e.Custom.darkmode(".dark-mode-toggle");
//     e.Dropdown.header("." + classes.toggle);
//     e.CurrentLink(
//       "." + classes.link,
//       classes.item,
//       classes.sub,
//       classes.main,
//       [classes.active, classes.current],
//       true
//     );
//   };

//     e.init = function () {
//     e.winLoad(e.BS.init);
//     e.winLoad(e.Custom.init);
//     };

//     e.init();
// })(NioApp);
