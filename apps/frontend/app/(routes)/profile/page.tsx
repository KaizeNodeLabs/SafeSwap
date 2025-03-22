"use client";

import CountrySelect from "@/components/shared/country-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { profile } from "@/lib/mocks/profile";

export default function ProfilePage() {
  const t = useTranslations();
  const { toast } = useToast();
  const [data, setdata] = useState(profile);

  const [selected, setSelected] = useState({ name: profile.country });

  const onSubmit = () => {
    setdata((prevData) => {
      const updatedData = { ...prevData, country: selected.name };

      console.log(updatedData);
      return updatedData;
    });

    toast({
      description: t("profile.successMessage"),
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold mt-8 sm:mt-0">
          {t("common.profile")}
        </h1>
        <p className="text-muted-foreground">{t("profile.subtitle")}</p>
      </div>

      <section className="mt-8">
        <form noValidate action={onSubmit} className="space-y-8">
          <div className="flex gap-5">
            <div className="space-y-2 w-full">
              <Label htmlFor="name">{t("profile.label.name")}</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder={t("profile.placeholder.name")}
                value={data.name}
                onChange={(e) => setdata({ ...data, name: e.target.value })}
              />
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="surname">{t("profile.label.surname")}</Label>
              <Input
                id="surname"
                name="surname"
                type="text"
                placeholder={t("profile.placeholder.surname")}
                value={data.surname}
                onChange={(e) => setdata({ ...data, surname: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="email">{t("profile.label.email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t("profile.placeholder.email")}
              value={data.email}
              onChange={(e) => setdata({ ...data, email: e.target.value })}
            />
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="stellarWallet">
              {t("profile.label.stellarWallet")}
            </Label>
            <Input
              id="stellarWallet"
              name="stellarWallet"
              type="text"
              placeholder={t("profile.placeholder.stellarWallet")}
              value={data.stellarWallet}
              disabled
            />
            <span className="text-muted-foreground text-xs md:text-sm">
              {t("profile.stellarWalletSpan")}
            </span>
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="telegramUsername">
              {t("profile.label.telegram")}
            </Label>
            <Input
              id="telegramUsername"
              name="telegramUsername"
              type="text"
              placeholder={t("profile.placeholder.telegram")}
              value={data.telegramUsername}
              onChange={(e) =>
                setdata({ ...data, telegramUsername: e.target.value })
              }
            />
            <span className="text-muted-foreground text-xs md:text-sm">
              {t("profile.telegramSpan")}
            </span>
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="country">{t("profile.label.country")}</Label>
            <CountrySelect selected={selected} setSelected={setSelected} />
          </div>

          <Button type="submit">{t("profile.save")}</Button>
        </form>
      </section>
    </>
  );
}
