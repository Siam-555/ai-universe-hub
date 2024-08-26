const aiCardContainer = document.getElementById('ai-card-container');
const spinner = document.getElementById('spinner');
const showAIDetails = document.getElementById('show_ai_modal');

const handleAllAIData = async () => {
  showSpinner(true);
  const allData = await (await fetch('https://openapi.programming-hero.com/api/ai/tools')).json();
  allData.data.tools.forEach(data => {
    showAICard(data);
  });
}

const showSpinner = (isLoading) => {
  if (isLoading) {
    spinner.classList.remove('hidden');
  }
  else {
    spinner.classList.add('hidden');
  }
}

const handleAIDetails = async id => {
  showSpinner(true);
  if (id < 10) {
    id = '0' + id;
  }
  else {
    id = id.toString();
  }
  const singleData = await (await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)).json();
  aiDetails(singleData.data);
}

const aiDetails = (data) => {
  console.log(data);
  const modalContainer = `
    <div class="modal-box max-w-fit max-h-screen grid grid-cols-2 gap-5 bg-white text-black">
      <div id="first-details-part" class="p-4 bg-red-50 border w-96 rounded-2xl border-red-500">
        <h3 class="text-lg font-semibold">${data.description}</h3>
        <div id='pricing' class="p-2 grid grid-cols-3 gap-2">
          ${data.pricing.map( d => {
            return `
              <div class="p-2 bg-white rounded-xl text-center content-center text-red-400">
                <p class="mb-3 text-blue-600">${d.price}</p>
                <p class="text-green-500">${d.plan}</p>
              </div>`
          }).join("")}
        </div>
        <div class="p-2 grid grid-cols-2">
          <div>
            <h3 class="text-xl font-semibold">Features</h3>
            <ol class="pl-7">
              ${Object.values(data.features).map( feature => `<li class="mt-2 list-disc">${feature.feature_name}</li>`).join("")}
            </ol>
          </div>
          <div>
            <h3 class="text-xl font-semibold">Integrations</h3>
            <ol class="pl-7">
              ${data.integrations && data.integrations.length > 0 
                ? data.integrations.map(integration => `<li class="mt-2 list-disc">${integration}</li>`).join("") 
                : "No data found"}
            </ol>
          </div>
        </div>
      </div>

      <div class="card bg-white border border-gray-300 w-96">
        <figure class="px-2 pt-2">
          <img src="${data.image_link[0]}" class="rounded-lg" />
        </figure>
        <div class="card-body pt-5 items-center text-center content-center">
          <h2 class="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </div>

    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>`
    showSpinner(false);
  showAIDetails.innerHTML = modalContainer;
}


const showAICard = (data) => {
  const aiCard = document.createElement('div');
  aiCard.classList.add('card', 'bg-gray-100');
  aiCard.innerHTML = `
    <figure class="px-4 pt-4">
      <img src="${data.image}" class="rounded-xl object-cover" />
    </figure>
    <div class="card-body p-5">
      <div>
        <h2 class="text-2xl font-semibold">Features</h2>
        <ol class="list-decimal px-8 my-2">
          ${data.features.map(feature => `<li>${feature}</li>`).join('')}
        </ol>
      </div>
      <hr class="h-1 mb-1 bg-gray-500">
      <div class='flex justify-between items-center'>
        <div>
          <h2 class="card-title pb-0">${data.name}</h2>
          <p><svg class='inline -mt-1 mr-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="#555555" fill="none"><path d="M18 2V4M6 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M3.5 8H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M3 8H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>${data.published_in}</p>
        </div>
        <div>
          <button onclick='handleAIDetails(${data.id}); show_ai_modal.showModal()' class='bg-orange-200 p-1 rounded-full'><svg class='rotate-180' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="orangered" fill="none"><path d="M3.99982 11.9998L19.9998 11.9998" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.99963 17C8.99963 17 3.99968 13.3176 3.99966 12C3.99965 10.6824 8.99966 7 8.99966 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg></button>
        </div>
      </div>
    </div>`;

    showSpinner(false);
    aiCardContainer.appendChild(aiCard);
}

handleAllAIData();