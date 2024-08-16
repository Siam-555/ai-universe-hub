const aiCardContainer = document.getElementById('ai-card-container');

const handleAllAIData = async () => {
  const allData = await (await fetch('https://openapi.programming-hero.com/api/ai/tools')).json();
  allData.data.tools.forEach(data => {
    // console.log(data);
    showAICard(data);
  });
}

const showAICard = (data) => {
  aiCardContainer.innerHTML = `
    <figure class="px-4 pt-4">
      <img src="${data.image}" class="rounded-xl" />
    </figure>
    <div class="card-body p-5">
      <div>
        <h2 class="text-2xl font-semibold">Features</h2>
        <ol class="list-decimal px-8 my-2">
          ${data.features.map(feature => `<li>${feature}</li>`).join('')}
        </ol>
      </div>
      <hr class="h-1 mb-1 bg-gray-500">
      <h2 class="card-title">${data.name}</h2>
      <p>${data.published_in}</p>
    </div>`;
}

handleAllAIData();