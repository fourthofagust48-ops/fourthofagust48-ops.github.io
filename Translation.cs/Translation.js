<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Interactive Translation</title>
<style>
  body {
    margin: 20px;
    font-family: 'Playfair Display', Georgia, serif;
    background-color: #69212e;
    color: white;
  }

  .tooltip-guide {
    font-size: 18px;
    margin-bottom: 20px;
    text-align: center;
  }

  .translation-box {
    position: absolute;
    background-color: white;
    color: black;
    padding: 8px 12px;
    border-radius: 12px;
    font-size: 16px;
    display: none;
    z-index: 1000;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    max-width: 300px;
  }

  .translatable {
    cursor: pointer;
    position: relative;
  }
</style>
</head>
<body>

<div class="tooltip-guide">برای دیدن ترجمه، روی هر جمله نگه دارید و بکشید</div>

<p>
  <span class="translatable" data-translation="سلام، این یک جمله نمونه است.">
    Hello, this is a sample sentence.
  </span>
</p>

<p>
  <span class="translatable" data-translation="این یک مثال دوم است.">
    This is a second example.
  </span>
</p>

<div id="translationBox" class="translation-box"></div>

<script>
const translationBox = document.getElementById('translationBox');

function showTranslation(element, clientX, clientY) {
  const translation = element.getAttribute('data-translation');
  translationBox.innerText = translation;
  translationBox.style.display = 'block';

  // قرارگیری بالای جمله
  const rect = element.getBoundingClientRect();
  let top = window.scrollY + rect.top - translationBox.offsetHeight - 10;
  let left = window.scrollX + rect.left;
  
  // بررسی برای جلوگیری از خروج کادر از صفحه
  if (left + translationBox.offsetWidth > window.innerWidth) {
    left = window.innerWidth - translationBox.offsetWidth - 10;
  }
  if (top < 0) top = rect.bottom + 10;

  translationBox.style.top = top + 'px';
  translationBox.style.left = left + 'px';
}

// دسکتاپ
document.querySelectorAll('.translatable').forEach(span => {
  span.addEventListener('mousedown', (e) => {
    showTranslation(span, e.clientX, e.clientY);
  });
  span.addEventListener('mouseup', () => {
    translationBox.style.display = 'none';
  });
  span.addEventListener('mouseleave', () => {
    translationBox.style.display = 'none';
  });
});

// موبایل / لمس
document.querySelectorAll('.translatable').forEach(span => {
  span.addEventListener('touchstart', (e) => {
    showTranslation(span, e.touches[0].clientX, e.touches[0].clientY);
  });
  span.addEventListener('touchend', () => {
    translationBox.style.display = 'none';
  });
  span.addEventListener('touchcancel', () => {
    translationBox.style.display = 'none';
  });
});
</script>

</body>
</html>
