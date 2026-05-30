import { Bell, Search, Menu, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMemo } from 'react';

export default function Header({
  title,
  subtitle,
  onMobileMenuClick
}) {
  const { user } = useAuth();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';

    return 'Good evening';
  }, []);

  const displayTitle =
    title ||
    `${greeting}, ${user?.name?.split(' ')[0] || 'User'} 👋`;

  return (
    <header
      className="
        sticky
        top-0
        z-30

        px-6
        py-5

        border-b
        border-white/10

        backdrop-blur-xl
        bg-black/20
      "
    >
      <div className="flex items-center justify-between gap-6">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenuClick}
            className="
              lg:hidden

              p-2.5
              rounded-xl

              glass-dark

              text-white
            "
          >
            <Menu size={20} />
          </button>

          <div>
            <div className="flex items-center gap-3">
              <h1
                className="
                  text-2xl
                  md:text-3xl
                  font-bold
                  text-white
                  tracking-tight
                "
              >
                {displayTitle}
              </h1>

              <div
                className="
                  hidden
                  md:flex

                  items-center
                  gap-1

                  px-2.5
                  py-1

                  rounded-full

                  bg-primary-500/10
                  border
                  border-primary-500/20

                  text-primary-300
                  text-xs
                  font-medium
                "
              >
                <Sparkles size={12} />
                Premium
              </div>
            </div>

            {subtitle && (
              <p
                className="
                  mt-1
                  text-sm
                  text-brand-muted
                "
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <div
            className="
              hidden
              md:flex

              items-center

              relative
            "
          >
            <Search
              size={15}
              className="
                absolute
                left-3
                text-brand-muted
              "
            />

            <input
              readOnly
              placeholder="Search anything..."
              className="
                w-72

                pl-10
                pr-4
                py-2.5

                rounded-2xl

                bg-white/5
                border
                border-white/10

                text-sm
                text-white

                outline-none

                transition-all

                focus:border-primary-500
              "
            />
          </div>

          {/* NOTIFICATIONS */}
          <button
            className="
              relative

              w-11
              h-11

              rounded-2xl

              bg-white/5

              border
              border-white/10

              flex
              items-center
              justify-center

              text-brand-muted

              hover:text-white
              hover:border-primary-500/30

              transition-all
            "
          >
            <Bell size={18} />

            <span
              className="
                absolute
                top-2
                right-2

                w-2.5
                h-2.5

                rounded-full

                bg-red-500

                ring-2
                ring-[#111118]
              "
            />
          </button>

          {/* PROFILE */}
          <div
            className="
              flex
              items-center
              gap-3

              px-3
              py-2

              rounded-2xl

              bg-white/5

              border
              border-white/10
            "
          >
            <div
              className="
                w-10
                h-10

                rounded-full

                bg-gradient-to-br
                from-primary-500
                to-purple-500

                flex
                items-center
                justify-center

                text-white
                font-semibold
              "
            >
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>

            <div className="hidden lg:block">
              <p
                className="
                  text-sm
                  font-semibold
                  text-white
                "
              >
                {user?.name}
              </p>

              <p
                className="
                  text-xs
                  text-brand-muted
                "
              >
                {user?.role || 'Administrator'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}