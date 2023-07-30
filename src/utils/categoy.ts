export const setCategoryId = (oldCategory: string, categories: any) => {
    for (const category of categories) {
        if (oldCategory === category.name) {
          return category.id;
        }
    }
    return 1
}