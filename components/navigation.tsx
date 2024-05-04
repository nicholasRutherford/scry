import Link from "next/link";
import { auth } from "@/auth";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { ThemeSwitcher } from "./theme-switcher";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default async function Navigation() {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">scry.party</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/feed">
            Feed
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        {userId && (
          <NavbarItem>
            <Button as={Link} color="primary" href="/question" variant="flat">
              Create Question
            </Button>
          </NavbarItem>
        )}
        {userId ? (
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Logout</Link>
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Sign up/ log in</Link>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
