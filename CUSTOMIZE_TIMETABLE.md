# 📝 How to Customize Your Timetable

## 🎨 Changing Button Text (Subject Names)

Open `frontend/src/components/Dashboard.js` and find the `subjects` array (around line 35).

### Current Structure:
```javascript
const subjects = [
  // 9:00-10:00
  ['MPMC', 'CN', 'WT', 'MP', 'SEPM'],
  // 10:00-11:00
  ['CN', 'MP', 'MPMC', 'WT', 'SEPM'],
  // ... more rows
];
```

### How to Edit:
- **8 rows** = 8 time slots (9am to 5pm)
- **5 columns** = 5 days (Monday to Friday)
- **Order:** [Monday, Tuesday, Wednesday, Thursday, Friday]

### Example Changes:

**To change Monday 9:00-10:00 from "MPMC" to "Math":**
```javascript
const subjects = [
  // 9:00-10:00
  ['Math', 'CN', 'WT', 'MP', 'SEPM'],  // Changed MPMC to Math
  // rest stays the same...
];
```

**To change entire 12:00-1:00 row to different lunch text:**
```javascript
// 12:00 PM-1:00 PM (4th row)
['Break', 'Break', 'Break', 'Break', 'Break'],
```

---

## 🌈 Changing Button Colors

Find the `subjectColors` object in the same file (around line 55).

### Current Colors:
```javascript
const subjectColors = {
  'MPMC': '#FFE5E5',      // Light red
  'CN': '#E5F5FF',        // Light blue
  'WT': '#E5FFE5',        // Light green
  'MP': '#FFF5E5',        // Light orange
  'SEPM': '#F5E5FF',      // Light purple
  'Lab': '#FFFFE5',       // Light yellow
  'Lunch': '#F5F5F5',     // Light gray
  'Faculty': '#E5FFFF',   // Light cyan
};
```

### How to Change Colors:

**Option 1: Change existing subject color:**
```javascript
'MPMC': '#FFB3B3',  // Changed to darker red
```

**Option 2: Add new subject color:**
```javascript
'Math': '#B3E5FF',  // Light blue for Math
```

**Option 3: Use color names or RGB:**
```javascript
'MPMC': 'lightpink',
'CN': 'rgb(173, 216, 230)',
'WT': '#90EE90',
```

### Popular Color Codes:
- Light Red: `#FFE5E5` or `#FFB3B3`
- Light Blue: `#E5F5FF` or `#B3D9FF`
- Light Green: `#E5FFE5` or `#B3FFB3`
- Light Yellow: `#FFFFE5` or `#FFFFB3`
- Light Purple: `#F5E5FF` or `#E5B3FF`
- Light Orange: `#FFF5E5` or `#FFD9B3`
- Light Pink: `#FFE5F5` or `#FFB3E5`
- Light Gray: `#F5F5F5` or `#E0E0E0`
- White: `#FFFFFF`

---

## 🎯 Complete Example

Let's say you want to customize Monday's schedule:

```javascript
const subjects = [
  // 9:00-10:00
  ['Mathematics', 'CN', 'WT', 'MP', 'SEPM'],
  // 10:00-11:00
  ['Computer Networks', 'MP', 'MPMC', 'WT', 'SEPM'],
  // 11:00-12:00 PM
  ['Web Tech', 'MPMC', 'MP', 'CN', 'SEPM'],
  // 12:00 PM-1:00 PM
  ['🍽️ Lunch Break', 'Lunch', 'Lunch', 'Lunch', 'Lunch'],
  // 1:00 PM-2:00 PM
  ['Lab Work', 'WT', 'CN', 'MPMC', 'MP'],
  // 2:00 PM-3:00 PM
  ['Lab Work', 'Lab', 'SEPM', 'Lab', 'Lab'],
  // 3:00 PM-4:00 PM
  ['MP', 'CN', 'WT', 'Lab', 'MPMC'],
  // 4:00 PM-5:00 PM
  ['Extra Class', 'Faculty', 'Faculty', 'Faculty', 'Faculty']
];

const subjectColors = {
  'Mathematics': '#FFD4D4',        // Pink for Math
  'Computer Networks': '#D4E8FF',  // Blue for CN
  'Web Tech': '#D4FFD4',           // Green for WT
  'MP': '#FFF5D4',                 // Orange for MP
  'SEPM': '#E8D4FF',               // Purple for SEPM
  'Lab Work': '#FFFFD4',           // Yellow for Lab
  'Lab': '#FFFFD4',                // Yellow for Lab
  '🍽️ Lunch Break': '#F0F0F0',    // Gray for Lunch
  'Lunch': '#F0F0F0',              // Gray for Lunch
  'Extra Class': '#D4FFFF',        // Cyan for Extra
  'Faculty': '#D4FFFF',            // Cyan for Faculty
};
```

---

## 📋 Quick Customization Steps

### Step 1: Change Subject Names
1. Open `Dashboard.js`
2. Find `const subjects = [`
3. Edit the text in quotes: `['YourSubject', ...]`
4. Save the file

### Step 2: Change Colors
1. In the same file, find `const subjectColors = {`
2. Edit the hex color code: `'SubjectName': '#HEXCODE'`
3. Add new entries for new subjects
4. Save the file

### Step 3: See Changes
1. Your app auto-reloads (if npm start is running)
2. If not, refresh your browser
3. Changes appear immediately!

---

## 🎨 Color Picker Tools

Use these websites to find perfect colors:
- **Google Color Picker:** Just search "color picker" on Google
- **HTML Color Codes:** https://htmlcolorcodes.com/
- **Coolors:** https://coolors.co/

---

## 💡 Tips

1. **Use light colors** - Dark text (#333) shows better on light backgrounds
2. **Keep consistency** - Use similar shade for similar subjects
3. **Test visibility** - Make sure text is readable
4. **Use emojis** - Add 📚 or 🍽️ to subject names for fun!

---

## ⚠️ Important Notes

- Each row MUST have exactly 5 values (Monday to Friday)
- Each column represents a day in order: Mon, Tue, Wed, Thu, Fri
- Subject name in `subjects` array MUST match the key in `subjectColors`
- If color not found, defaults to white (#FFFFFF)

---

## 🚀 Example: Real Timetable

Based on your attached image, here's how you might structure it:

```javascript
const subjects = [
  ['MPMC PB r-501', 'CN PB r-108', 'WT SS r-501', 'MP SS r-501', 'Lab'],
  ['CN PB r-108', 'MP SS r-501', 'MPMC PB r-501', 'WT SS r-501', 'Lab'],
  ['WT SS r-501', 'MPMC PB r-501', 'MP SS r-501', 'CN PB r-108', 'Lab'],
  ['Lunch', 'Lunch', 'Lunch', 'Lunch', 'Lunch'],
  ['Lab', 'WT SS r-501', 'CN PB r-108', 'MPMC PB r-501', 'MP SS r-501'],
  ['Lab', 'Lab', 'SEPM', 'Lab', 'Lab'],
  ['MP SS r-501', 'CN PB r-108', 'WT SS r-501', 'Lab', 'MPMC PB r-501'],
  ['SM - Faculty', 'Faculty', 'Faculty', 'Faculty', 'Faculty']
];
```

---

**Happy Customizing! 🎓**
