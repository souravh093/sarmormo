import { TPricePlans } from "@/types/pricePlan.interface";
import { isDev } from "./isDevcheck";

export const pricePlans: TPricePlans[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for occasional use",
    price: 9,
    paymentLink: isDev ? "https://buy.stripe.com/test_14kbKRdpL9nK0AE288" : "",
    items: [
      "19 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    priceId: isDev ? "price_1R4wnNCZr93k2ikJ36t8TJtn" : "",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals and teams",
    price: 19,
    paymentLink: isDev ? "https://buy.stripe.com/test_28obKRadzarO4QU5kl" : "",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    priceId: isDev ? "price_1R4wr3CZr93k2ikJFIEmE3bD" : "",
  },
];
