export function generateSparks(count = 40) {
  const container = document.querySelector('.spark-container');

  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const spark = document.createElement('div');
    spark.classList.add('spark');

    const size = Math.random() * 2 + 1.5;
    spark.style.width = `${size}px`;
    spark.style.height = `${size * 3}px`;
    spark.style.left = `${Math.random() * 100}%`;
    spark.style.animationDuration = `${Math.random() * 4 + 3}s`;
    spark.style.animationDelay = `${Math.random() * 5}s`;

    container.appendChild(spark);
  }
}