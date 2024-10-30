from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.
class HomeView(TemplateView):
    template_name = 'index.html'
    
class RegisterView(TemplateView):
    template_name = 'register.html'
    
class LoginView(TemplateView):
    template_name = 'login.html'
    
class ContactUsView(TemplateView):
    template_name = 'contact_us.html'
    
class AboutUsView(TemplateView):
    template_name = 'about_us.html'
    
class ProfileView(TemplateView):
    template_name = 'profile.html'
    
class UpdateProfileView(TemplateView):
    template_name = 'update_profile.html'
    
class ChangePasswordView(TemplateView):
    template_name = 'change_password.html'
    
class AddCourseView(TemplateView):
    template_name = 'add_course.html'
    
class CourseDetailsView(TemplateView):
    template_name = 'course_details.html'
    
class ConfirmEmailView(TemplateView):
    template_name = 'confirm_email.html'
    
class ActivateUserView(TemplateView):
    template_name = 'email_confirmation_status.html'