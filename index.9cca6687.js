!function(){var e,t,a={openFeedbackModalBtn:document.querySelector('[data-action="open-feedback-modal"]'),closeFeedbackModalBtn:document.querySelector('[data-action="close-feedback-modal"]'),feedbackBackdrop:document.querySelector(".js-feedback-backdrop"),feedbackForm:document.querySelector(".feedback-form"),formFieldName:document.querySelector(".feedback-form__input--name"),formFieldEmail:document.querySelector(".feedback-form__input--email"),formFieldMessage:document.querySelector(".feedback-form__input--textarea-message"),feedbackFormSubmitBtn:document.querySelector(".feedback-form__submit-button")},o="feedback-form-state",c={};function r(){a.feedbackBackdrop.classList.add("is-hidden"),a.closeFeedbackModalBtn.removeEventListener("click",r),document.removeEventListener("keyup",n),a.feedbackBackdrop.removeEventListener("click",d),a.feedbackForm.removeEventListener("submit",m),a.feedbackForm.removeEventListener("input",i)}function d(e){e.currentTarget===e.target&&r()}function n(e){"Escape"===e.code&&r()}function m(e){r(),localStorage.removeItem(o),console.log(c)}function i(e){if(""!==e.target.value.trim()){c[e.target.name]=e.target.value;var t=JSON.stringify(c);localStorage.setItem(o,t)}else e.currentTarget.reset()}a.openFeedbackModalBtn.addEventListener("click",(function(){a.feedbackBackdrop.classList.remove("is-hidden"),a.closeFeedbackModalBtn.addEventListener("click",r),document.addEventListener("keyup",n),a.feedbackBackdrop.addEventListener("click",d),a.feedbackForm.addEventListener("submit",m),a.feedbackForm.addEventListener("input",i)})),e=localStorage.getItem(o),t=JSON.parse(e),e&&(a.formFieldName.value=t.userName,a.formFieldEmail.value=t.userEmail,a.formFieldMessage.value=t.userMessage)}();
//# sourceMappingURL=index.9cca6687.js.map
