import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import SwitchCameraOutlinedIcon from '@mui/icons-material/SwitchCameraOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DiscountIcon from '@mui/icons-material/Discount';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import ChairAltIcon from '@mui/icons-material/ChairAlt';

const Menuitems = [
  {
    title: "Dashboard",
    icon: DashboardOutlinedIcon,
    href: "/admin/dashboard",
  },
  {
    title: "Products",
    icon: ChairAltIcon,
    href: "/admin/products",
  },
  {
    title: "Discounts",
    icon: DiscountIcon,
    href: "/admin/discounts",
  },
  {
    title: "Order",
    icon: AssignmentTurnedInOutlinedIcon,
    href: "/admin/orders",
  },
  {
    title: "Payment",
    icon: AlbumOutlinedIcon,
    href: "/form-elements/radio",
  },
  {
    title: "Invoice",
    icon: SwitchCameraOutlinedIcon,
    href: "/form-elements/slider",
  },
  {
    title: "Categorys",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/admin/categorys",
  },
  // {
  //   title: "Switch",
  //   icon: SwitchLeftOutlinedIcon,
  //   href: "/form-elements/switch",
  // },
  // {
  //   title: "Form",
  //   icon: DescriptionOutlinedIcon,
  //   href: "/form-layouts/form-layouts",
  // },
  // {
  //   title: "Table",
  //   icon: AutoAwesomeMosaicOutlinedIcon,
  //   href: "/tables/basic-table",
  // },
];

export default Menuitems;
