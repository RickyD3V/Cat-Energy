const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
  nav.classList.toggle('open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Открыть меню');
  });
});

document.querySelectorAll('[data-goal]').forEach((link) => {
  link.addEventListener('click', () => {
    const option = document.querySelector(`input[name="goal"][value="${link.dataset.goal}"]`);
    if (option) option.checked = true;
  });
});

const form = document.querySelector('#cat-form');
const error = document.querySelector('#form-error');
const result = document.querySelector('#result');
const resultTitle = document.querySelector('#result-title');
const resultText = document.querySelector('#result-text');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  error.textContent = '';
  const data = new FormData(form);
  const age = Number(data.get('age'));
  const weight = Number(data.get('weight'));
  const name = String(data.get('name') || '').trim();
  const goal = data.get('goal');

  if (!Number.isFinite(age) || age < 0 || age > 30 || !Number.isFinite(weight) || weight < 0.5 || weight > 20) {
    error.textContent = 'Проверьте возраст и вес: укажите реальные значения.';
    result.hidden = true;
    return;
  }

  const greeting = name ? `${name}, вашему питомцу` : 'Вашему питомцу';
  if (goal === 'active') {
    resultTitle.textContent = `${greeting} подойдёт «Энергия и сила»`;
    resultText.textContent = `Для активного кота важно полноценное питание и постоянный доступ к свежей воде. При возрасте ${age} лет и весе ${weight.toLocaleString('ru-RU')} кг рацион лучше согласовать с ветеринарным врачом.`;
  } else {
    resultTitle.textContent = `${greeting} подойдёт «Лёгкость и баланс»`;
    resultText.textContent = `Для спокойного питомца важны сбалансированный рацион и регулярная активность. При возрасте ${age} лет и весе ${weight.toLocaleString('ru-RU')} кг не меняйте питание резко и обсудите порции с ветеринарным врачом.`;
  }
  result.hidden = false;
});

form?.addEventListener('reset', () => {
  error.textContent = '';
  result.hidden = true;
});
