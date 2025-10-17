export default async function getAllpost () {
    const result = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
    return result.json();
}