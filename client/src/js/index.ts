// ======================== custom type
type city = "cairo" | "monufia";
type gender = "male";
// ========================

// ======================== inline assignment
let age: number = 10;
let firstName: string = "osama";
let lastName: string = "ashraf";
let city: city = "cairo";
let interests: string[] = ["sport", "swimming", "reading"];
console.log(
  `I am ${firstName} ${lastName} from ${city} interested with ${interests[2]}`
);
// ========================

// ======================== interface assignment
interface Iperson {
  readonly id: number;
  profName: string;
  age: number;
  gender: gender;
  isAdmin?: boolean;
}

const person: Iperson = {
  id: 1,
  profName: "Person",
  age: 36,
  gender: "male",
  isAdmin: true,
};
// ========================

// ======================== type assignment
type product = {
  readonly id: number;
  title: string;
  img: string;
  desc: string;
  price: number;
  color: string[];
  isFeauted?: boolean;
  isStock?: boolean;
};

const product: product = {
  id: 2,
  title: "Shirt",
  img: "http://placehold.it/",
  desc: "Awesome product you can wear this shirt in holiday summer",
  price: 50,
  color: ["black", "white"],
  isFeauted: true,
  isStock: false,
};

let printProduct = `${product.title} costs $ ${product.price}`;
console.log(printProduct);
// ========================
const sumArr = (numbers: number[]): number => {
  let sum: number = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];
  }
  return sum;
};

let calculate = sumArr([5, 4, 6, 0, 2]);
console.log(calculate);
