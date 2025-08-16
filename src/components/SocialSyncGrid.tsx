import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: "/icons/facebook.svg",
    title: "Auto-Sync",
    description: "Facebook Stories",
  },
  {
    icon: "/icons/tiktok.svg",
    title: "Sync",
    description: "TikTok Stories",
  },
  {
    icon: "/icons/instagram.svg",
    title: "Auto-Sync",
    description: "Instagram Stories",
  },
  {
    icon: "/icons/twitter.svg",
    title: "Sync",
    description: "Twitter Feeds",
  },
];

export function SocialSyncGrid() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto p-4">
      {services.map((service, index) => (
        <Card
          key={index}
          className="flex items-center justify-center text-center py-6 shadow-md"
        >
          <CardContent className="flex flex-col items-center gap-2">
            <img
              src={service.icon}
              alt={service.description}
              className="w-12 h-12"
            />
            <p className="font-semibold text-xl">{service.title}</p>
            <p className="text-muted-foreground">{service.description}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
