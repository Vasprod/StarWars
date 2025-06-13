export function generateSparks(count = 20) {
  const container = document.querySelector('.spark-container');
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const spark = document.createElement('div');
    spark.classList.add('spark');

    const size = Math.random() * 6 + 4; 
    spark.style.width = `${4}px`;
    spark.style.height = `${6}px`;

    const x = (Math.random() - 0.5) * 400; // разлёт по горизонтали шире
    const y = Math.random() * 500 + 200;   // падение дальше вниз

    spark.style.setProperty('--x', `${x}px`);
    spark.style.setProperty('--y', `${y}px`);

    spark.style.left = `${Math.random() * 100}%`; 
    spark.style.animationDuration = `${Math.random() * 1 + 1.5}s`; 
    

    container.appendChild(spark);

    setTimeout(() => spark.remove(), 3000);
  }

  // Повторяем эффект
  setTimeout(() => generateSparks(count), 400);
}