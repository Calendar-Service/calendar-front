# 🗓️ **플업 - 계획부터 정산까지**

**플업**은 사용자가 **일정을 추가, 수정, 삭제**하고, 캘린더와 리스트에서 즉시 반영할 수 있도록 지원하는 **일정 관리 서비스**입니다.  
실시간 업데이트와 직관적인 UI를 통해 효과적인 일정 관리 경험을 제공합니다.

---

## 🚀 **Implemented Features**

### 📅 **Schedule Management**
- **일정 추가, 수정, 삭제 기능 구현**
- **캘린더 및 리스트 동기화**로 실시간 일정 관리 가능
- **날짜 선택 필터링**을 통해 특정 날짜의 일정만 표시

### 🔔 **Real-time Updates & Notifications**
- 일정이 추가/수정/삭제될 때 즉시 리스트 및 캘린더에 반영
- `toast` 알림을 통해 변경 사항을 실시간으로 확인 가능

### 📝 **Enhanced Schedule List**
- 일정별 **메모 (note) 기능 추가**
- 삭제 버튼(❌)을 일정 제목 우측에 배치하여 UX 개선
- 같은 날짜에서 시작 및 종료되는 일정도 정상적으로 표시
- 메모 길이가 길 경우 **더보기/접기** 버튼을 통해 가독성 향상

---

## 🛠 **Tech Stack**

### 💻 **Frontend**
- **Next.js 15**
- **React 19**
- **TypeScript 5**

### 💅 **Styling**
- **Tailwind CSS 4**

### 📅 **Calendar**
- **FullCalendar**
  - `@fullcalendar/daygrid`
  - `@fullcalendar/timegrid`
  - `@fullcalendar/interaction`

### 🔧 **State Management & Utilities**
- **React Hooks**
- **Axios**

### 🔔 **Notifications**
- **react-hot-toast**

### 📝 **UI Components**
- **Lucide React**
- **Radix UI**

### 📝 **Code Style & Linting**
- **ESLint 9**

---

## 🛠 **Installation & Setup**

### 📂 **Clone the repository**
```bash
git clone https://github.com/Calendar-Service/calendar-front.git
cd calendar-front
