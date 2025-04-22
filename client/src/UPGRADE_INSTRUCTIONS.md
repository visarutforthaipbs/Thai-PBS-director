# แนวทางการแก้ไขปัญหา TypeScript ใน Chakra UI v3

พบว่าโปรเจคของเรากำลังใช้ Chakra UI เวอร์ชั่น 3.16.1 ซึ่งมี API ที่แตกต่างจากเวอร์ชั่นที่พบใน documentation ทั่วไป
เพื่อแก้ไขปัญหา TypeScript error ในโปรเจค ต่อไปนี้คือแนวทางแก้ไข:

## 1. แก้ไขไฟล์ theme/index.ts

ใช้ API ที่ถูกต้องสำหรับการสร้าง theme ใน Chakra UI v3

```typescript
import { theme as baseTheme } from "@chakra-ui/react";
import "@fontsource/sarabun/400.css";
import "@fontsource/sarabun/700.css";

const theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    brand: {
      red: "#D71920",
      beige: "#F9F6F2",
      gray: "#666666",
    },
  },
  fonts: {
    ...baseTheme.fonts,
    heading: `'Sarabun', sans-serif`,
    body: `'Sarabun', sans-serif`,
  },
  styles: {
    ...baseTheme.styles,
    global: {
      body: {
        bg: "brand.beige",
        color: "brand.gray",
      },
    },
  },
  components: {
    ...baseTheme.components,
    Button: {
      ...baseTheme.components?.Button,
      variants: {
        ...baseTheme.components?.Button?.variants,
        solid: {
          bg: "brand.red",
          color: "white",
          _hover: {
            bg: "red.600",
          },
        },
      },
    },
  },
};

export default theme;
```

## 2. ติดตั้ง @chakra-ui/icons แยกต่างหาก

```bash
npm install @chakra-ui/icons
```

## 3. แก้ไข Component API ต่างๆ

### Image component

แก้ไข property `fallbackSrc` เป็น:

```tsx
<Image
  src={imageUrl}
  alt={altText}
  fallback={<Box bg="gray.200" width="full" height="full" />}
/>
```

### VStack/Stack spacing

อาจต้องใช้ marginY/marginX แทน spacing ใน v3:

```tsx
<VStack>
  <Box marginBottom={4}>Item 1</Box>
  <Box marginBottom={4}>Item 2</Box>
</VStack>
```

### List, ListItem, ListIcon

แก้ไขการใช้ List component:

```tsx
<Box as="ul">
  <Box as="li" display="flex">
    <Icon as={CheckIcon} marginRight={2} />
    <Text>List item</Text>
  </Box>
</Box>
```

### RadioGroup

ใช้ Radio component แบบกำหนด state เอง:

```tsx
const [value, setValue] = useState("option1");

return (
  <Box>
    <Radio checked={value === "option1"} onChange={() => setValue("option1")}>
      Option 1
    </Radio>
    <Radio checked={value === "option2"} onChange={() => setValue("option2")}>
      Option 2
    </Radio>
  </Box>
);
```

### Select component

ใช้ component อื่นแทน เช่น:

```tsx
<Box as="select" onChange={handleChange}>
  <Box as="option" value="option1">
    Option 1
  </Box>
  <Box as="option" value="option2">
    Option 2
  </Box>
</Box>
```

## 4. ทางเลือกอื่น

แทนที่จะแก้ไขโค้ดทั้งหมด อาจพิจารณาทางเลือกดังนี้:

1. **Downgrade** Chakra UI เป็นเวอร์ชั่นที่เข้ากันได้กับโค้ดปัจจุบัน (v2.x)

   ```bash
   npm uninstall @chakra-ui/react @emotion/react @emotion/styled framer-motion
   npm install @chakra-ui/react@2.8.0 @emotion/react@11 @emotion/styled@11 framer-motion@6
   ```

2. **ปรับปรุงโค้ดให้เข้ากับ Chakra UI v3**
   แก้ไขตามแนวทางด้านบนสำหรับแต่ละ component ที่มีปัญหา

3. **Bypass TypeScript Errors**
   ใช้ // @ts-ignore หรือ // @ts-nocheck เพื่อข้ามข้อผิดพลาด (ไม่แนะนำสำหรับระยะยาว)
