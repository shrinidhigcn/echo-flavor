interface Recipe {
  id: string;
  title: string;
  description: string;
  mood: string;
  prepTime: string;
  servings: number;
  calories: number;
  ingredients: string[];
  steps: string[];
  tags: string[];
}

// Recipe database organized by mood
const recipeDatabase = {
  happy: [
    {
      title: "Sunshine Citrus Smoothie Bowl",
      description: "A vibrant, energizing bowl packed with tropical fruits and topped with crunchy granola. Perfect for celebrating good vibes!",
      prepTime: "10 mins",
      servings: 2,
      calories: 285,
      ingredients: [
        "2 frozen bananas, sliced",
        "1 cup frozen mango chunks", 
        "1/2 cup coconut milk",
        "2 tbsp honey",
        "1/4 cup granola",
        "2 tbsp coconut flakes",
        "1 kiwi, sliced",
        "Fresh mint leaves"
      ],
      steps: [
        "Blend frozen bananas, mango, coconut milk, and honey until smooth and creamy",
        "Pour into bowls and smooth the surface",
        "Arrange kiwi slices, granola, and coconut flakes on top",
        "Garnish with fresh mint leaves and serve immediately"
      ],
      tags: ["Healthy", "Quick", "Tropical", "Energizing"]
    },
    {
      title: "Celebration Pasta Primavera", 
      description: "Colorful vegetables tossed with perfectly cooked pasta in a light, zesty sauce. A dish as bright as your mood!",
      prepTime: "25 mins",
      servings: 4,
      calories: 420,
      ingredients: [
        "12 oz penne pasta",
        "2 cups broccoli florets",
        "1 red bell pepper, sliced",
        "1 yellow bell pepper, sliced", 
        "1 cup cherry tomatoes, halved",
        "3 cloves garlic, minced",
        "1/4 cup olive oil",
        "1/2 cup parmesan cheese",
        "Fresh basil leaves",
        "Salt and pepper to taste"
      ],
      steps: [
        "Cook pasta according to package directions until al dente",
        "Heat olive oil in a large skillet over medium heat",
        "Sauté garlic for 30 seconds, then add bell peppers and broccoli",
        "Cook vegetables for 5-7 minutes until crisp-tender",
        "Add cherry tomatoes and cook for 2 more minutes",
        "Toss with cooked pasta, parmesan, and fresh basil",
        "Season with salt and pepper, serve hot"
      ],
      tags: ["Vegetarian", "Colorful", "Light", "Fresh"]
    }
  ],
  excited: [
    {
      title: "Power-Packed Protein Bowl",
      description: "Fuel your energy with this protein-rich bowl featuring quinoa, grilled chicken, and vibrant vegetables.",
      prepTime: "20 mins", 
      servings: 2,
      calories: 485,
      ingredients: [
        "1 cup cooked quinoa",
        "2 grilled chicken breasts, sliced",
        "1 avocado, diced",
        "1/2 cup edamame beans", 
        "1/2 cup shredded carrots",
        "2 cups spinach leaves",
        "2 tbsp tahini",
        "1 tbsp lemon juice",
        "1 tsp sriracha",
        "Pumpkin seeds for garnish"
      ],
      steps: [
        "Arrange quinoa as the base in two bowls",
        "Top with spinach leaves, sliced chicken, and edamame",
        "Add diced avocado and shredded carrots",
        "Whisk together tahini, lemon juice, and sriracha for dressing",
        "Drizzle dressing over bowls and garnish with pumpkin seeds"
      ],
      tags: ["High-Protein", "Energizing", "Balanced", "Post-Workout"]
    }
  ],
  sad: [
    {
      title: "Comfort Masala Khichdi",
      description: "A warm, soul-soothing one-pot meal that wraps you in comfort with aromatic spices and creamy textures.",
      prepTime: "30 mins",
      servings: 3,
      calories: 320,
      ingredients: [
        "1/2 cup basmati rice",
        "1/2 cup yellow lentils (moong dal)",
        "1 tsp turmeric powder",
        "1 tsp cumin seeds", 
        "1 inch ginger, grated",
        "2 tbsp ghee",
        "Salt to taste",
        "3 cups water",
        "Fresh cilantro for garnish",
        "A squeeze of lemon"
      ],
      steps: [
        "Wash and soak rice and lentils together for 15 minutes",
        "Heat ghee in a pressure cooker or heavy-bottomed pot",
        "Add cumin seeds and let them splutter",
        "Add grated ginger and sauté for 30 seconds",
        "Add drained rice and lentils, turmeric, and salt",
        "Add water and cook until soft and mushy (15-20 minutes)",
        "Garnish with cilantro and serve with a squeeze of lemon"
      ],
      tags: ["Comfort Food", "One-Pot", "Warming", "Easy Digest"]
    },
    {
      title: "Healing Chicken Soup",
      description: "Classic comfort in a bowl with tender chicken, healing herbs, and warming broth to lift your spirits.",
      prepTime: "45 mins",
      servings: 4, 
      calories: 240,
      ingredients: [
        "2 chicken breasts, cubed",
        "8 cups chicken broth",
        "2 carrots, diced",
        "2 celery stalks, diced",
        "1 onion, chopped",
        "3 cloves garlic, minced",
        "1 bay leaf",
        "1 tsp dried thyme",
        "1/2 cup egg noodles",
        "Salt and pepper to taste",
        "Fresh parsley"
      ],
      steps: [
        "Sauté onion, carrots, and celery until softened",
        "Add garlic and cook for another minute",
        "Pour in chicken broth and add chicken, bay leaf, and thyme",
        "Simmer for 20 minutes until chicken is cooked through",
        "Add egg noodles and cook for 8-10 minutes",
        "Season with salt and pepper",
        "Garnish with fresh parsley before serving"
      ],
      tags: ["Comfort Food", "Healing", "Classic", "Warming"]
    }
  ],
  stressed: [
    {
      title: "Calming Chamomile Tea Cookies", 
      description: "Gentle, anxiety-soothing cookies infused with chamomile tea and lavender for ultimate relaxation.",
      prepTime: "40 mins",
      servings: 12,
      calories: 165,
      ingredients: [
        "2 cups all-purpose flour",
        "1/2 cup butter, softened",
        "1/2 cup powdered sugar",
        "2 chamomile tea bags",
        "1 tsp dried lavender",
        "1 egg yolk",
        "2 tbsp milk",
        "1/4 tsp vanilla extract",
        "Pinch of salt"
      ],
      steps: [
        "Preheat oven to 325°F (165°C)",
        "Empty tea bags and mix chamomile with lavender",
        "Cream butter and sugar, add egg yolk and vanilla",
        "Mix in flour, salt, and herb mixture",
        "Add milk gradually to form a soft dough", 
        "Roll into small balls and place on baking sheet",
        "Bake for 15-18 minutes until lightly golden",
        "Cool completely before serving with tea"
      ],
      tags: ["Relaxing", "Herbal", "Comfort", "Self-Care"]
    },
    {
      title: "Stress-Relief Buddha Bowl",
      description: "A nourishing bowl with magnesium-rich ingredients and omega-3s to naturally calm your nervous system.",
      prepTime: "25 mins",
      servings: 2,
      calories: 395,
      ingredients: [
        "1 cup cooked brown rice",
        "1/2 cup roasted chickpeas",
        "1 cup steamed broccoli",
        "1/2 avocado, sliced",
        "2 tbsp pumpkin seeds",
        "1 tbsp hemp hearts",
        "2 tbsp almond butter",
        "1 tbsp maple syrup",
        "1 tsp lemon juice",
        "Pinch of sea salt"
      ],
      steps: [
        "Divide brown rice between two bowls as the base",
        "Arrange steamed broccoli, chickpeas, and avocado on top",
        "Sprinkle with pumpkin seeds and hemp hearts",
        "Whisk almond butter, maple syrup, lemon juice, and salt for dressing",
        "Drizzle dressing over bowls and serve immediately"
      ],
      tags: ["Stress-Relief", "Magnesium-Rich", "Plant-Based", "Nourishing"]
    }
  ],
  calm: [
    {
      title: "Zen Green Tea Matcha Latte",
      description: "A meditative drink that combines the calming properties of matcha with creamy oat milk for perfect tranquility.",
      prepTime: "8 mins",
      servings: 1,
      calories: 145,
      ingredients: [
        "1 tsp ceremonial grade matcha powder",
        "2 tbsp hot water (175°F)",
        "1 cup oat milk",
        "1 tbsp honey or maple syrup",
        "1/4 tsp vanilla extract",
        "Pinch of sea salt",
        "Optional: coconut whipped cream"
      ],
      steps: [
        "Sift matcha powder into a small bowl to remove clumps",
        "Add hot water and whisk vigorously in a W pattern until frothy",
        "Heat oat milk in a small saucepan until steaming",
        "Add honey, vanilla, and salt to the milk",
        "Pour the matcha mixture into a mug",
        "Top with the warm oat milk, creating a beautiful layer",
        "Optional: top with coconut whipped cream"
      ],
      tags: ["Meditative", "Antioxidant", "Calming", "Ritual"]
    },
    {
      title: "Peaceful Miso Soup with Tofu",
      description: "A traditional, soul-warming soup that brings mindfulness and comfort with every sip.",
      prepTime: "15 mins",
      servings: 2,
      calories: 125,
      ingredients: [
        "3 cups dashi broth (or vegetable broth)",
        "2 tbsp white miso paste",
        "4 oz silken tofu, cubed",
        "2 green onions, sliced thin",
        "1 sheet nori, cut into strips",
        "1/2 cup wakame seaweed (optional)",
        "1 tsp sesame oil"
      ],
      steps: [
        "Gently heat dashi broth in a medium saucepan",
        "In a small bowl, whisk miso paste with a little warm broth until smooth",
        "Add the miso mixture back to the pot and stir gently",
        "Add tofu cubes and wakame, simmer for 2-3 minutes",
        "Remove from heat and add sesame oil",
        "Ladle into bowls and garnish with green onions and nori",
        "Serve immediately while warm"
      ],
      tags: ["Traditional", "Mindful", "Light", "Warming"]
    }
  ]
};

export function generateRecipe(mood: string): Recipe {
  const moodRecipes = recipeDatabase[mood as keyof typeof recipeDatabase] || recipeDatabase.happy;
  const selectedRecipe = moodRecipes[Math.floor(Math.random() * moodRecipes.length)];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    mood: mood,
    ...selectedRecipe
  };
}

export function getMoodExplanation(mood: string): string {
  const explanations = {
    happy: "Your voice shows joy and enthusiasm! I've selected uplifting, colorful recipes to match your positive energy.",
    excited: "I detect high energy and enthusiasm in your voice! These protein-packed recipes will fuel your excitement.",
    sad: "I hear some heaviness in your tone. These comfort foods are designed to provide warmth and emotional nourishment.",
    stressed: "Your voice patterns suggest tension. These calming recipes contain ingredients known to help reduce stress naturally.",
    calm: "Your voice has a peaceful, relaxed quality. These mindful recipes promote tranquility and well-being."
  };
  
  return explanations[mood as keyof typeof explanations] || explanations.happy;
}