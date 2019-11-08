"""
WSGI config for new_orient_site project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

sys.path.append('/home/ec2-user/environment/new_orient_site')             # 追加
sys.path.append('/home/ec2-user/environment/new_orient_site/new_orient_site')   # 追加
sys.path.append('/home/ec2-user/environment/new_orient_site/new_orient')   # 追加

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "new_orient_site.settings")

application = get_wsgi_application()
