import { TGroup } from "@/types";
import {
  LayoutGrid,
  ShoppingCart,
  TicketPercent,
  Images,
  Star,
  Users,
  FileText,
  Info,
  Phone,
  Share2,
  Image,
  ClipboardList,
  Layout,
  FolderTree,
  Badge,
  Sparkles,
  Package,
  FolderOpen,
  Workflow,
} from "lucide-react";

export function getMenuList(pathname: string): TGroup[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Overview",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/order",
          label: "Orders",
          active: pathname.includes("/order"),
          icon: ShoppingCart,
          submenus: [
            {
              href: "/new_order",
              label: "New Orders",
              active: pathname.includes("/new_order"),
              icon: ShoppingCart,
            },

            {
              href: "/order-list",
              label: "Orders",
              active: pathname.includes("/order-list"),
              icon: ClipboardList,
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Management",
      menus: [
        {
          href: "/catalog",
          label: "Catalog",
          active: pathname.includes("/catalog"),
          icon: FolderTree,
          submenus: [
            {
              href: "/category/category",
              label: "Category",
              active: pathname === "/category/category",
              icon: FolderOpen,
            },
            {
              href: "/category/subcategory",
              label: "Subcategory",
              active: pathname === "/category/subcategory",
              icon: FolderTree,
            },

            {
              href: "/brand",
              label: "Brand",
              active: pathname.includes("/brand"),
              icon: Badge,
            },

            {
              href: "/product-review",
              label: "Review",
              active: pathname.includes("/product-review"),
              icon: Star,
            },
          ],
        },

        {
          href: "/products",
          label: "Products",
          active: pathname.includes("/products"),
          icon: Package,
          submenus: [],
        },
        {
          href: "/marketing",
          label: "Marketing",
          active: pathname.includes("/marketing"),
          icon: Sparkles,
          submenus: [
            {
              href: "/campaign",
              label: "Campaign",
              active: pathname.includes("/campaign"),
              icon: Sparkles,
            },
            {
              href: "/coupon",
              label: "Coupon",
              active: pathname.includes("/coupon"),
              icon: TicketPercent,
            },
          ],
        },

        {
          href: "/user",
          label: "Customer",
          active: pathname.includes("/user"),
          icon: Users,
          submenus: [],
        },

      ],
    },
    {
      groupLabel: "Pages",

      menus: [
        {
          href: "/page-section",
          label: "Page_Section",
          active: pathname.includes("/page-section"),
          icon: Images,
          submenus: [
            {
              href: "/banners",
              label: "Banners",
              active: pathname.includes("/banners"),
              icon: Images,
            },

            {
              href: "/about",
              label: "About",
              active: pathname.includes("/about"),
              icon: Info,
            },

            {
              href: "/contact",
              label: "Contact",
              active: pathname.includes("/contact"),
              icon: Phone,
            },
            {
              href: "/policy",
              label: "Policy",
              active: pathname.includes("/policy"),
              icon: FileText,
            },

            {
              href: "/logo",
              label: "Set Logo",
              active: pathname.includes("/logo"),
              icon: Image,
            },
          ],
        },

        {
          href: "/social",
          label: "Social",
          active: pathname.includes("/social"),
          icon: Share2,
          submenus: [],
        },

        {
          href: "/home_controll",
          label: "Home Page Control",
          active: pathname.includes("/home_controll"),
          icon: Layout,
          submenus: [],
        },
      ],
    },

    {
      groupLabel: "Preferences",

      menus: [
        
        {
          href: "/staffs",
          label: "Staffs",
          active: pathname.includes("/staffs"),
          icon: Share2,
          submenus: [],
        },
        {
          href: "/integration",
          label: "Integration",
          active: pathname.includes("/integration"),
          icon:Workflow,
          submenus: [],
        },
      ],
    },
  ];
}
