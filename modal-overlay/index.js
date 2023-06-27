const form = document.querySelector('form');
const dialog = document.querySelector('dialog');
const container = document.querySelector('.container');
let currentOffer = null;

// Créer un objet pour chaque offre
const offers = {
  one: {
    button: document.querySelector('#offerOneButton'),
    message: 'This is offer one!',
    acceptMessage: 'Offer one accepted'
  },
  two: {
    button: document.querySelector('#offerTwoButton'),
    message: 'This is offer two!',
    acceptMessage: 'Offer two accepted'
  }
};

const lightDismiss = ({ target }) => {
  if (target.nodeName === 'DIALOG') {
    dialog.close('dismiss');
  }
};

const showOffer = (offerKey) => {
  const offer = offers[offerKey];
  currentOffer = offer;
  dialog.querySelector('p').textContent = offer.message;
  dialog.querySelector('button[type="submit"]').textContent =
    'Accept offer ' + offerKey;
  dialog.showModal();
};

// Stocke les gestionnaires d'événements pour pouvoir les supprimer plus tard
const showOfferHandlers = {
  one: () => showOffer('one'),
  two: () => showOffer('two')
};

// Fonction pour remplacer le bouton par une span
const replaceButtonWithSpan = (button, text, offerKey) => {
  const span = document.createElement('span');
  span.textContent = text;
  button.parentElement.replaceChild(span, button);
  button.removeEventListener('click', showOfferHandlers[offerKey]);
};

// Ajouter des écouteurs d'événements pour chaque offre
Object.keys(offers).forEach((offerKey) => {
  offers[offerKey].button.addEventListener('click', () => showOffer(offerKey));
});

dialog.addEventListener('click', lightDismiss);

dialog.addEventListener('close', () => {
  if (dialog.returnValue === 'confirm' && currentOffer) {
    replaceButtonWithSpan(
      currentOffer.button,
      currentOffer.acceptMessage,
      currentOffer
    );
  }
});
