from django.urls import path
from .views import *

urlpatterns = [
    path('' , HomeView.as_view(), name='home'),
    path('course/department/<slug>' , HomeView.as_view(), name='dept_wise_course'),
    path('user/register/' , RegisterView.as_view(), name='register'),
    path('user/login/' , LoginView.as_view(), name='login'),
    path('user/confirm_email/' , ConfirmEmailView.as_view(), name='confirm_email'),
    path('user/activate/' , ActivateUserView.as_view(), name='activate'),
    path('contact_us/' , ContactUsView.as_view(), name='contact_us'),
    path('about_us/' , AboutUsView.as_view(), name='about_us'),
    # path('course/details/' , CourseDetailsView.as_view(), name='course_details'),
    path('user/teacher/course/add/' , AddCourseView.as_view(), name='add_course'),
    path('user/profile/' , ProfileView.as_view(), name='profile'),
    path('user/profile/update/' , UpdateProfileView.as_view(), name='update_profile'),
    path('user/profile/change/password' , ChangePasswordView.as_view(), name='change_password'),
]
