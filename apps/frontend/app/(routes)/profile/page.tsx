"use client";

import CountrySelect from "@/components/shared/country-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { profile as initialProfile } from "@/lib/mocks/profile";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// Define a type for the user profile
type Profile = {
  name: string;
  surname: string;
  email: string;
  stellarWallet: string;
  telegramUsername: string;
  country: string;
};

export default function ProfilePage() {
  const t = useTranslations();
  const { toast } = useToast();
  const [isFormChanged, setIsFormChanged] = useState(false);
  // Keep a reference to the current profile (after saving)
  const [currentProfile, setCurrentProfile] = useState<Profile>(initialProfile);
  
  // Defining the validation scheme with Zod
  const formSchema = z.object({
    name: z.string().min(1, t("profile.validation.nameRequired")),
    surname: z.string().min(1, t("profile.validation.surnameRequired")),
    email: z.string().email(t("profile.validation.emailInvalid")),
    stellarWallet: z.string(),
    telegramUsername: z.string().default(""),
    country: z.string().min(1, t("profile.validation.countryRequired")),
  });
  
  // Type derived from the Zod schema
  type FormValues = z.infer<typeof formSchema>;
  
  // Initializing React Hook Form with Zod
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: currentProfile,
  });

  // Local state for the country (since countrySelect handles its own state)
  const [selectedCountry, setSelectedCountry] = useState({ name: currentProfile.country });

  // Watch for changes in the form to enable/disable the button
  useEffect(() => {
    const subscription = form.watch((value) => {
      // Check if any values ​​have changed from the current values
      const hasChanged = Object.keys(currentProfile).some(key => {
        const profileKey = key as keyof Profile;
        const valueKey = key as keyof FormValues;
        return currentProfile[profileKey] !== value[valueKey];
      });
      
      setIsFormChanged(hasChanged);
    });
    
    return () => subscription.unsubscribe();
  }, [form, form.watch, currentProfile]);

  const onSubmit = (values: FormValues) => {
    // Ensure that telegramUsername is a string (never undefined)
    const updatedProfile: Profile = {
      ...values,
      telegramUsername: values.telegramUsername || "",
    };
    
    // Update the current profile with the new values
    setCurrentProfile(updatedProfile);
    
    toast({
      description: t("profile.successMessage"),
    });

    console.log("Saved profile:", updatedProfile);
    
    // After successful saving, the form is no longer modified
    setIsFormChanged(false);
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col md:flex-row gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2 w-full">
                    <Label htmlFor="name">{t("profile.label.name")}</Label>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder={t("profile.placeholder.name")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem className="space-y-2 w-full">
                    <Label htmlFor="surname">{t("profile.label.surname")}</Label>
                    <FormControl>
                      <Input
                        id="surname"
                        placeholder={t("profile.placeholder.surname")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2 w-full">
                  <Label htmlFor="email">{t("profile.label.email")}</Label>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("profile.placeholder.email")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stellarWallet"
              render={({ field }) => (
                <FormItem className="space-y-2 w-full">
                  <Label htmlFor="stellarWallet">
                    {t("profile.label.stellarWallet")}
                  </Label>
                  <FormControl>
                    <Input
                      id="stellarWallet"
                      placeholder={t("profile.placeholder.stellarWallet")}
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <span className="text-muted-foreground text-xs md:text-sm">
                    {t("profile.stellarWalletSpan")}
                  </span>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telegramUsername"
              render={({ field }) => (
                <FormItem className="space-y-2 w-full">
                  <Label htmlFor="telegramUsername">
                    {t("profile.label.telegram")}
                  </Label>
                  <FormControl>
                    <Input
                      id="telegramUsername"
                      placeholder={t("profile.placeholder.telegram")}
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <span className="text-muted-foreground text-xs md:text-sm">
                    {t("profile.telegramSpan")}
                  </span>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="space-y-2 w-full">
                  <Label htmlFor="country">{t("profile.label.country")}</Label>
                  <FormControl>
                    <div className="w-full">
                      <CountrySelect
                        selected={selectedCountry}
                        setSelected={(value) => {
                          setSelectedCountry(value);
                          field.onChange(value.name);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={!isFormChanged || !form.formState.isValid}
            >
              {t("profile.save")}
            </Button>
          </form>
        </Form>
      </section>
    </>
  );
}