import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Fetch fresh user data with attendance records
    fetchUserData(parsedUser.id);
  }, [navigate]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`/api/user/get?userId=${userId}`);
      const userData = response.data.user;
      
      setUser(userData);
      setAttendanceRecords(userData.attendanceRecords || []);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleLectureClick = (day, time, subjectName) => {
    // Don't open modal for Lunch Break only
    if (subjectName === 'Lunch Break') {
      return;
    }

    setSelectedLecture({ day, timeSlot: time, subject: subjectName });
    setShowModal(true);
  };

  const handleMarkAttendance = async (status) => {
    if (!selectedLecture || !user) return;

    setLoading(true);
    
    try {
      const response = await axios.post('/api/attendance/mark', {
        userId: user.id,
        day: selectedLecture.day,
        timeSlot: selectedLecture.timeSlot,
        status
      });

      // Update user data
      const updatedUser = response.data.user;
      setUser(updatedUser);
      setAttendanceRecords(updatedUser.attendanceRecords);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setShowModal(false);
      setSelectedLecture(null);
    } catch (err) {
      console.error('Error marking attendance:', err);
      alert('Failed to mark attendance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getLectureStatus = (day, timeSlot) => {
    const record = attendanceRecords.find(
      r => r.day === day && r.timeSlot === timeSlot
    );
    return record ? record.status : null;
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'attended':
        return ' ✓';
      case 'bunked':
        return ' ⚠️';
      case 'cancelled':
        return ' ✖️';
      default:
        return '';
    }
  };

  const getCurrentStatus = () => {
    if (!selectedLecture) return null;
    return getLectureStatus(selectedLecture.day, selectedLecture.timeSlot);
  };

  // Get current date and day
  const getCurrentDate = () => {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[today.getDay()];
    const date = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    
    return `${dayName}, ${date} ${month} ${year}`;
  };

  // Define time slots and days
  const timeSlots = [
    '9:00-10:00',
    '10:00-11:00',
    '11:00-12:00 PM',
    '12:00 PM-1:00 PM',
    '1:00 PM-2:00 PM',
    '2:00 PM-3:00 PM',
    '3:00 PM-4:00 PM',
    '4:00 PM-5:00 PM'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Define subjects for each time slot
  // You can change these to match your actual timetable
  const subjects = [
    // 9:00-10:00
    ['Blank', 'Blank', 'EM IV Tut/Java Prog', 'SSOS Lab/BVLSI Design', 'Blank'],
    // 10:00-11:00
    ['MPMC', 'Entrepreneurship', 'EM IV Tut/Java Prog', 'SSOS Lab/BVLSI Design', 'AOA'],
    // 11:00-12:00 PM
    ['SSOS', 'EM IV', 'BVLSI Design', 'MPMC', 'Java Prog/MPMC Lab'],
    // 12:00 PM-1:00 PM (Lunch Break)
    ['Lunch Break', 'Lunch Break', 'SSOS', 'Lunch Break', 'Java Prog/MPMC Lab'],
    // 1:00 PM-2:00 PM
    ['BVLSI Design', 'MPMC Lab/AOA Lab', 'Lunch Break', 'AOA', 'Lunch Break'],
    // 2:00 PM-3:00 PM
    ['EM IV', 'MPMC Lab/AOA Lab', 'Programming Lab', 'Entrepreneurship', 'MPMC'],
    // 3:00 PM-4:00 PM
    ['BVLSI Lab/SSOS Lab', 'SSOS', 'EM IV', 'BVLSI Design', 'AOA Lab/EM IV Tuts'],
    // 4:00 PM-5:00 PM
    ['BVLSI Lab/SSOS Lab', 'AOA', 'Blank', 'Blank', 'AOA Lab/EM IV Tuts']
  ];

  // Define colors for each subject (optional)
  const subjectColors = {
    'MPMC': '#d2d3d9ff',      
    'SSOS': '#d2d3d9ff',        
    'BVLSI Design': '#d2d3d9ff',        
    'EM IV': '#d2d3d9ff',        
    'AOA': '#d2d3d9ff',      
    'Entrepreneurship': '#d2d3d9ff',       
    'Java Prog/MPMC Lab': '#d2d3d9ff',     
    'AOA Lab/EM IV Tuts': '#d2d3d9ff',   
    'MPMC Lab/AOA Lab': '#d2d3d9ff',
    'EM IV Tut/Java Prog': '#d2d3d9ff',   
    'SSOS Lab/BVLSI Design': '#d2d3d9ff',
    'Blank': '#ffffffff',
    'Lunch Break': '#7c84eeff', //Lunch Break
    'Programming Lab': '#d2d3d9ff',
    'BVLSI Lab/SSOS Lab': '#d2d3d9ff', // Lecture
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Attendance Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="welcome-section">
          <div className="welcome-header">
            <h2>Welcome, {user.name}!</h2>
            <p className="current-date">{getCurrentDate()}</p>
          </div>
          <p className="user-info">
            <span><strong>Username:</strong> {user.username}</span>
            <span><strong>Roll Number:</strong> {user.rollNumber}</span>
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <h3>Lectures Attended</h3>
              <p className="stat-value">{user.lecturesAttended || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Total Lectures</h3>
              <p className="stat-value">{user.totalLectures || 0}</p>
            </div>
          </div>

          <div className="stat-card highlight">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <h3>Attendance Percentage</h3>
              <p className="stat-value">{user.attendancePercentage || 0}%</p>
            </div>
          </div>
        </div>

        {/* Timetable Section */}
        <div className="timetable-section">
          <h2 className="timetable-title">Weekly Timetable - SY ECS B</h2>
          <div className="timetable-grid-container">
            {/* Header with day labels */}
            <div className="timetable-header">
              <div className="header-corner"></div>
              {days.map((day, index) => (
                <div key={index} className="day-header">
                  {day}
                </div>
              ))}
            </div>

            {/* Timetable body with time labels and buttons */}
            <div className="timetable-body">
              {timeSlots.map((time, timeIndex) => (
                <div key={timeIndex} className="timetable-row">
                  <div className="time-cell">{time}</div>
                  {days.map((day, dayIndex) => {
                    const subjectName = subjects[timeIndex][dayIndex];
                    const bgColor = subjectColors[subjectName] || '#FFFFFF';
                    const status = getLectureStatus(day, time);
                    const emoji = getStatusEmoji(status);
                    const isClickable = subjectName !== 'Lunch Break';
                    
                    return (
                      <button
                        key={`${timeIndex}-${dayIndex}`}
                        className={`lecture-button ${status ? `lecture-${status}` : ''} ${!isClickable ? 'non-clickable' : ''}`}
                        onClick={() => handleLectureClick(day, time, subjectName)}
                        style={{ backgroundColor: bgColor }}
                        disabled={!isClickable}
                      >
                        {subjectName}{emoji}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Modal */}
      {showModal && selectedLecture && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="attendance-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            
            <h3>Mark Attendance</h3>
            <p className="modal-lecture-info">
              <strong>{selectedLecture.subject}</strong><br />
              {selectedLecture.day} | {selectedLecture.timeSlot}
            </p>

            {getCurrentStatus() && (
              <p className="current-status">
                Current Status: <span className={`status-${getCurrentStatus()}`}>
                  {getCurrentStatus().charAt(0).toUpperCase() + getCurrentStatus().slice(1)}
                </span>
              </p>
            )}

            <div className="attendance-options">
              <button 
                className="attendance-btn attended-btn"
                onClick={() => handleMarkAttendance('attended')}
                disabled={loading}
              >
                <span className="btn-emoji">✓</span>
                Attended
              </button>

              <button 
                className="attendance-btn bunked-btn"
                onClick={() => handleMarkAttendance('bunked')}
                disabled={loading}
              >
                <span className="btn-emoji">⚠️</span>
                Bunked
              </button>

              <button 
                className="attendance-btn cancelled-btn"
                onClick={() => handleMarkAttendance('cancelled')}
                disabled={loading}
              >
                <span className="btn-emoji">✖️</span>
                Cancelled/Holiday
              </button>
            </div>

            {loading && <p className="loading-text">Updating...</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
