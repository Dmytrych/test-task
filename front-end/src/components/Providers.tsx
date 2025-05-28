'use client'

import {SessionProvider} from "next-auth/react";
import type { Session } from "next-auth";

const Providers = ({ children, session }: { children: React.ReactNode, session: Session | null }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}

export default Providers
